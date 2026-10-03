// ---------------------------------------------------------------------------
// strava-art Worker — the index and cache of #stravaart activities.
//
//   GET /art.json   public: { activities } — cached Strava data, newest first.
//                   The site build reads this and never calls Strava itself.
//   GET /sweep?token=…&days=14
//       re-check recent activity descriptions for #stravaart, add/refresh/
//       remove cached activities, and trigger a site rebuild if anything
//       changed.
//   GET /sweep?token=…&ids=1,2,3
//       same, but for specific activities only (cheap backfill or refresh
//       of older art without walking the whole history).
//
// Strava doesn't send webhooks for description edits and list summaries
// don't include descriptions, so a sweep fetches each activity's details —
// and keeps them, so pages are built from this cache.
// ---------------------------------------------------------------------------

import {
    fetchActivity,
    getAccessToken,
    hasArtTag,
    listActivities,
    slimActivity,
    type StravaActivity,
} from '../../../src/lib/strava-api'

interface Env {
    ART: KVNamespace
    STRAVA_CLIENT_ID: string
    STRAVA_CLIENT_SECRET: string
    STRAVA_REFRESH_TOKEN: string
    SWEEP_TOKEN: string
    BUILD_HOOK_URL: string
}

const INDEX_KEY = 'index'
const DAY = 86_400
const DEFAULT_DAYS = 14
const MAX_DAYS = 3650
// Detail fetches per sweep. Strava allows 100 reads per 15 minutes; the
// token exchange and list pages use a few, so stay comfortably under.
const MAX_DETAILS = 80

export default {
    async fetch(req: Request, env: Env): Promise<Response> {
        const url = new URL(req.url)
        if (req.method !== 'GET') return new Response(null, { status: 405 })

        if (url.pathname === '/art.json') return artIndex(env)
        if (url.pathname === '/sweep') {
            if (!(await tokenMatches(url.searchParams.get('token'), env))) {
                return new Response('Forbidden', { status: 403 })
            }
            try {
                return await sweep(url, env)
            } catch (err) {
                // Token exchange or activity list failed (e.g. a 429 from
                // Strava's rate limit) — nothing was changed, so just retry later.
                console.warn('[strava-art] sweep failed:', err)
                return Response.json(
                    { error: String(err instanceof Error ? err.message : err) },
                    { status: 502 }
                )
            }
        }
        return new Response('Not found', { status: 404 })
    },
} satisfies ExportedHandler<Env>

async function readIndex(env: Env): Promise<StravaActivity[]> {
    return (await env.ART.get<StravaActivity[]>(INDEX_KEY, 'json')) ?? []
}

async function artIndex(env: Env): Promise<Response> {
    return Response.json(
        { activities: await readIndex(env) },
        {
            headers: {
                'Cache-Control': 'public, max-age=60',
                'Access-Control-Allow-Origin': '*',
            },
        }
    )
}

async function tokenMatches(given: string | null, env: Env): Promise<boolean> {
    if (!given || !env.SWEEP_TOKEN) return false
    const enc = new TextEncoder()
    const a = enc.encode(given)
    const b = enc.encode(env.SWEEP_TOKEN)
    return a.byteLength === b.byteLength && crypto.subtle.timingSafeEqual(a, b)
}

async function sweep(url: URL, env: Env): Promise<Response> {
    const token = await getAccessToken({
        clientId: env.STRAVA_CLIENT_ID,
        clientSecret: env.STRAVA_CLIENT_SECRET,
        refreshToken: env.STRAVA_REFRESH_TOKEN,
    })

    const idsParam = url.searchParams.get('ids')
    const { batch, truncated } = idsParam
        ? idBatch(idsParam)
        : await windowBatch(url, token)

    const details = await Promise.all(
        batch.map((b) => fetchActivity(b.id, token))
    )

    const index = new Map((await readIndex(env)).map((a) => [a.id, a]))
    const added: number[] = []
    const updated: number[] = []
    const removed: number[] = []
    for (const detail of details) {
        // Skip failed fetches rather than treating them as untagged.
        if (!detail) continue
        const act = slimActivity(detail)
        const cached = index.get(act.id)
        if (hasArtTag(act.description)) {
            if (!cached) added.push(act.id)
            else if (JSON.stringify(cached) !== JSON.stringify(act))
                updated.push(act.id)
            index.set(act.id, act)
        } else if (index.delete(act.id)) {
            removed.push(act.id)
        }
    }

    let rebuilt = false
    if (added.length || updated.length || removed.length) {
        const activities = [...index.values()].sort((a, b) =>
            b.start_date.localeCompare(a.start_date)
        )
        await env.ART.put(INDEX_KEY, JSON.stringify(activities))
        rebuilt = await triggerBuild(env)
    }

    // Resume point for another sweep. Failed fetches (usually 429s from
    // Strava's rate limit) must be re-checked, so resume just after the newest
    // failure (`before` is exclusive); otherwise continue past this batch.
    // For ?ids= sweeps, `next` lists the ids still to check instead.
    const failed = details.filter((d) => !d).length
    const firstFail = details.findIndex((d) => !d)
    const nextUrl = new URL(url)
    nextUrl.searchParams.delete('token')
    let next: string | undefined
    if (idsParam) {
        const remaining = [
            ...batch.filter((_, i) => !details[i]).map((b) => b.id),
            ...truncated,
        ]
        if (remaining.length) {
            nextUrl.searchParams.set('ids', remaining.join(','))
            next = `${nextUrl.pathname}${nextUrl.search}&token=…`
        }
    } else {
        let resumeBefore: number | undefined
        if (firstFail >= 0) {
            resumeBefore = epoch(batch[firstFail].start_date!) + 1
        } else if (truncated.length) {
            resumeBefore = epoch(batch[batch.length - 1].start_date!)
        }
        if (resumeBefore !== undefined) {
            nextUrl.searchParams.set('before', String(resumeBefore))
            next = `${nextUrl.pathname}${nextUrl.search}&token=…`
        }
    }

    return Response.json({
        checked: details.length - failed,
        failed,
        added,
        updated,
        removed,
        rebuilt,
        truncated: next !== undefined,
        next,
    })
}

interface BatchItem {
    id: number
    start_date?: string
}

/** ?ids=1,2,3 — check exactly these activities (up to MAX_DETAILS). */
function idBatch(param: string): { batch: BatchItem[]; truncated: number[] } {
    const ids = [
        ...new Set(
            param
                .split(',')
                .map((s) => Number(s.trim()))
                .filter((n) => Number.isInteger(n) && n > 0)
        ),
    ]
    return {
        batch: ids.slice(0, MAX_DETAILS).map((id) => ({ id })),
        truncated: ids.slice(MAX_DETAILS),
    }
}

/** ?days=N[&before=epoch] — check every activity in the window, newest
 *  first, so a truncated sweep covers the most recent ones and `next` walks
 *  further back in time. */
async function windowBatch(
    url: URL,
    token: string
): Promise<{ batch: BatchItem[]; truncated: number[] }> {
    const days = clamp(
        Number(url.searchParams.get('days')) || DEFAULT_DAYS,
        1,
        MAX_DAYS
    )
    const after = Math.floor(Date.now() / 1000) - days * DAY
    // `before` continues a truncated sweep (see `next` in the response).
    const before = Number(url.searchParams.get('before')) || undefined

    const summaries = (await listActivities(token, { after, before })).sort(
        (a, b) => b.start_date.localeCompare(a.start_date)
    )
    return {
        batch: summaries.slice(0, MAX_DETAILS),
        truncated: summaries.slice(MAX_DETAILS).map((s) => s.id),
    }
}

async function triggerBuild(env: Env): Promise<boolean> {
    if (!env.BUILD_HOOK_URL) return false
    const res = await fetch(env.BUILD_HOOK_URL, { method: 'POST' })
    if (!res.ok) console.warn(`[strava-art] build hook failed: ${res.status}`)
    return res.ok
}

function epoch(iso: string): number {
    return Math.floor(Date.parse(iso) / 1000)
}

function clamp(n: number, min: number, max: number): number {
    return Math.min(max, Math.max(min, Math.floor(n)))
}
