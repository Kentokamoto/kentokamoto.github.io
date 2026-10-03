import polyline from '@mapbox/polyline'
import { stripArtTag, type StravaActivity } from './strava-api'

// ---------------------------------------------------------------------------
// Strava Art — build-time data.
//
// The build reads cached activities from the strava-art Worker's /art.json
// (see StravaArt/+page.server.ts) and never calls Strava itself, so builds
// don't spend API rate limit or need Strava credentials. Presentation (units, pace, the map) is
// the card's job — the format/polyline helpers here are optional utilities.
// ---------------------------------------------------------------------------

/** Raw, render-agnostic activity data for the Strava Art cards. */
export interface ArtActivity {
    id: number
    name: string
    /** Description with the #stravaart tag stripped. */
    description: string
    sportType: string
    startDate: string // ISO 8601
    /** Local wall-clock time; format with timeZone 'UTC' to show it as-is. */
    startDateLocal: string
    distance: number // meters
    movingTime: number // seconds
    elapsedTime: number // seconds
    elevationGain: number // meters
    kudos: number
    /** Encoded summary polyline, or null when the activity has no GPS map. */
    polyline: string | null
    /** Optional brand/commission tag. */
    brand?: string
    href: string
}

function toArtActivity(act: StravaActivity, brand?: string): ArtActivity {
    return {
        id: act.id,
        name: act.name,
        description: stripArtTag(act.description),
        sportType: act.sport_type,
        startDate: act.start_date,
        startDateLocal: act.start_date_local,
        distance: act.distance,
        movingTime: act.moving_time,
        elapsedTime: act.elapsed_time,
        elevationGain: act.total_elevation_gain,
        kudos: act.kudos_count,
        polyline: act.map?.summary_polyline ?? null,
        brand,
        href: `https://www.strava.com/activities/${act.id}`,
    }
}

const METERS_PER_MILE = 1609.344

export function formatDistance(meters: number): string {
    return `${(meters / METERS_PER_MILE).toFixed(2)} mi`
}

/** Foot-based sports show pace (min/mi); wheels show speed (mph). */
export function formatPaceOrSpeed(
    sportType: string,
    meters: number,
    seconds: number
): { label: string; value: string } | null {
    if (!meters || !seconds) return null
    const miles = meters / METERS_PER_MILE
    if (/Run|Walk|Hike/.test(sportType)) {
        const perMile = Math.round(seconds / miles)
        return { label: 'Pace', value: `${formatDuration(perMile)} /mi` }
    }
    if (/Ride|Skate|Ski/.test(sportType)) {
        return {
            label: 'Speed',
            value: `${(miles / (seconds / 3600)).toFixed(1)} mph`,
        }
    }
    return null
}

export function formatElevation(meters: number): string {
    return `${Math.round(meters * 3.28084).toLocaleString('en-US')} ft`
}

export function formatDuration(seconds: number): string {
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

/** Shape cached Strava activities into ArtActivity records, newest first. */
export function toArtActivities(
    activities: StravaActivity[],
    brands: Record<number, string>
): ArtActivity[] {
    return activities
        .map((act) => toArtActivity(act, brands[act.id]))
        .sort((a, b) => b.startDate.localeCompare(a.startDate))
}

/** Fetch cached activities from the strava-art Worker's /art.json.
 *  Returns [] when unset or unreachable so the build still succeeds. */
export async function fetchArtIndex(
    url: string | undefined,
    fetchFn: typeof fetch = fetch
): Promise<StravaActivity[]> {
    if (!url) return []
    try {
        const res = await fetchFn(url)
        if (!res.ok) throw new Error(`${res.status} ${res.statusText}`)
        const json = (await res.json()) as { activities?: StravaActivity[] }
        return Array.isArray(json.activities) ? json.activities : []
    } catch (err) {
        console.warn('[strava] art index unavailable:', err)
        return []
    }
}
