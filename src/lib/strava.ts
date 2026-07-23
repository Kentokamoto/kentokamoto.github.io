import polyline from '@mapbox/polyline'

// ---------------------------------------------------------------------------
// Strava API — build-time helpers.
//
// These run only on the server during prerender (see StravaArt/+page.server.ts).
// Nothing here (tokens, secrets, the polyline lib) is shipped to the browser;
// only the decoded SVG path + plain metadata are serialized into the page.
// ---------------------------------------------------------------------------

export interface StravaConfig {
    clientId: string
    clientSecret: string
    refreshToken: string
}

export interface RoutePiece {
    id: number
    name: string
    distanceMi: string
    duration: string
    /** SVG path string in a 0 0 100 100 viewBox, or null when no GPS map. */
    path: string | null
    /** Optional brand/commission tag; renders the card with a gold accent. */
    brand?: string
    href: string
}

interface StravaActivity {
    id: number
    name: string
    distance: number // meters
    moving_time: number // seconds
    map?: { summary_polyline?: string | null }
}

/** Exchange the long-lived refresh token for a short-lived access token. */
async function getAccessToken(
    cfg: StravaConfig,
    fetchFn: typeof fetch
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

/** Fetch one activity by id. Returns null on any error so a single bad id
 *  never fails the whole build. */
async function fetchActivity(
    id: number,
    token: string,
    fetchFn: typeof fetch
): Promise<StravaActivity | null> {
    const res = await fetchFn(`https://www.strava.com/api/v3/activities/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    })
    if (!res.ok) {
        console.warn(`[strava] activity ${id} fetch failed: ${res.status}`)
        return null
    }
    return (await res.json()) as StravaActivity
}

const METERS_PER_MILE = 1609.344

function formatDistance(meters: number): string {
    return `${(meters / METERS_PER_MILE).toFixed(1)} mi`
}

function formatDuration(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    const pad = (n: number) => String(n).padStart(2, '0')
    return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`
}

/**
 * Decode an encoded polyline into an SVG path fitted to a square viewBox.
 * Uses an equirectangular projection (longitude scaled by cos(lat)) so the
 * route keeps its real proportions, and flips Y for SVG's top-left origin.
 */
export function polylineToPath(
    encoded: string | null | undefined,
    size = 100,
    padding = 8
): string | null {
    if (!encoded) return null
    const pts = polyline.decode(encoded) // [[lat, lng], ...]
    if (pts.length < 2) return null

    const meanLat = pts.reduce((sum, [lat]) => sum + lat, 0) / pts.length
    const k = Math.cos((meanLat * Math.PI) / 180)
    const proj = pts.map(([lat, lng]) => [lng * k, lat] as [number, number])

    const xs = proj.map((p) => p[0])
    const ys = proj.map((p) => p[1])
    const minX = Math.min(...xs)
    const maxX = Math.max(...xs)
    const minY = Math.min(...ys)
    const maxY = Math.max(...ys)
    const spanX = maxX - minX || 1
    const spanY = maxY - minY || 1

    const scale = (size - padding * 2) / Math.max(spanX, spanY)
    const offsetX = (size - spanX * scale) / 2
    const offsetY = (size - spanY * scale) / 2

    return proj
        .map(([x, y], i) => {
            const px = offsetX + (x - minX) * scale
            const py = size - (offsetY + (y - minY) * scale) // flip Y
            return `${i === 0 ? 'M' : 'L'}${px.toFixed(2)} ${py.toFixed(2)}`
        })
        .join(' ')
}

export interface PieceSeed {
    id: number
    brand?: string
}

/**
 * Fetch and shape the curated activities into render-ready RoutePieces.
 * Returns [] (never throws) so the build succeeds even without credentials
 * or when the API is unreachable — the page falls back to embeds in that case.
 */
export async function fetchRoutePieces(
    seeds: PieceSeed[],
    cfg: Partial<StravaConfig>,
    fetchFn: typeof fetch = fetch
): Promise<RoutePiece[]> {
    if (!cfg.clientId || !cfg.clientSecret || !cfg.refreshToken) return []

    let token: string
    try {
        token = await getAccessToken(cfg as StravaConfig, fetchFn)
    } catch (err) {
        console.warn('[strava] skipping build-time fetch:', err)
        return []
    }

    const results = await Promise.all(
        seeds.map(async (seed): Promise<RoutePiece | null> => {
            const act = await fetchActivity(seed.id, token, fetchFn)
            if (!act) return null
            return {
                id: act.id,
                name: act.name,
                distanceMi: formatDistance(act.distance),
                duration: formatDuration(act.moving_time),
                path: polylineToPath(act.map?.summary_polyline),
                brand: seed.brand,
                href: `https://www.strava.com/activities/${act.id}`,
            }
        })
    )

    return results.filter((r): r is RoutePiece => r !== null)
}
