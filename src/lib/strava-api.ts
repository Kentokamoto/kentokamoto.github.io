// ---------------------------------------------------------------------------
// Strava API — dependency-free client.
//
// Shared by the site build (src/lib/strava.ts) and the strava-art Worker
// (workers/strava-art), so keep this free of SvelteKit and npm imports.
// ---------------------------------------------------------------------------

export interface StravaConfig {
    clientId: string
    clientSecret: string
    refreshToken: string
}

/** Subset of Strava's activity fields we use. `description` is only present
 *  on the detailed activity (GET /activities/{id}), not on list summaries. */
export interface StravaActivity {
    id: number
    name: string
    description?: string | null
    sport_type: string
    start_date: string // ISO 8601
    /** Wall-clock time where the activity happened (has a misleading Z). */
    start_date_local: string
    distance: number // meters
    moving_time: number // seconds
    elapsed_time: number // seconds
    total_elevation_gain: number // meters
    kudos_count: number
    map?: { summary_polyline?: string | null }
}

const API = 'https://www.strava.com/api/v3'

/** Keep only the fields above. Detailed activities also carry laps, splits,
 *  segment efforts and more (often tens of KB), which we don't cache. */
export function slimActivity(act: StravaActivity): StravaActivity {
    return {
        id: act.id,
        name: act.name,
        description: act.description ?? null,
        sport_type: act.sport_type,
        start_date: act.start_date,
        start_date_local: act.start_date_local,
        distance: act.distance,
        moving_time: act.moving_time,
        elapsed_time: act.elapsed_time,
        total_elevation_gain: act.total_elevation_gain,
        kudos_count: act.kudos_count,
        map: { summary_polyline: act.map?.summary_polyline ?? null },
    }
}

/** Marks an activity as art when it appears in the description. */
export const ART_TAG = /#stravaart\b/i

export function hasArtTag(text: string | null | undefined): boolean {
    return !!text && ART_TAG.test(text)
}

/** Remove the art tag (and the whitespace it leaves behind) for display. */
export function stripArtTag(text: string | null | undefined): string {
    if (!text) return ''
    return text
        .replace(new RegExp(ART_TAG.source, 'gi'), '')
        .replace(/[ \t]{2,}/g, ' ')
        .trim()
}

/** Exchange the long-lived refresh token for a short-lived access token. */
export async function getAccessToken(
    cfg: StravaConfig,
    fetchFn: typeof fetch = fetch
): Promise<string> {
    const res = await fetchFn('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: cfg.clientId,
            client_secret: cfg.clientSecret,
            grant_type: 'refresh_token',
            refresh_token: cfg.refreshToken,
        }),
    })
    if (!res.ok) {
        const body = await res.text().catch(() => '')
        throw new Error(
            `Strava token exchange failed: ${res.status} ${res.statusText} — ${body}`
        )
    }
    const json = (await res.json()) as { access_token: string }
    return json.access_token
}

/** Fetch one detailed activity by id. Returns null on any error so a single
 *  bad id never fails a whole build or sweep. */
export async function fetchActivity(
    id: number,
    token: string,
    fetchFn: typeof fetch = fetch
): Promise<StravaActivity | null> {
    const res = await fetchFn(`${API}/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
        console.warn(`[strava] activity ${id} fetch failed: ${res.status}`)
        return null
    }
    return (await res.json()) as StravaActivity
}

/** List the athlete's activities started within (after, before) — epoch
 *  seconds — following pagination. Summaries only, no `description`. */
export async function listActivities(
    token: string,
    range: { after: number; before?: number },
    fetchFn: typeof fetch = fetch,
    maxPages = 10
): Promise<StravaActivity[]> {
    const all: StravaActivity[] = []
    const bounds =
        `after=${range.after}` + (range.before ? `&before=${range.before}` : '')
    for (let page = 1; page <= maxPages; page++) {
        const url = `${API}/athlete/activities?${bounds}&per_page=200&page=${page}`
        const res = await fetchFn(url, {
            headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) {
            throw new Error(`Strava activity list failed: ${res.status}`)
        }
        const batch = (await res.json()) as StravaActivity[]
        all.push(...batch)
        if (batch.length < 200) break
    }
    return all
}
