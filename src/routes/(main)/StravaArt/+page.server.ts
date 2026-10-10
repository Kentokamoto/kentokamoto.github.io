import { env } from '$env/dynamic/private'
import { fetchArtIndex, toArtActivities } from '$lib/strava'
import { loadArtFixture } from '$lib/server/strava-fixture'
import type { PageServerLoad } from './$types'

// Art is any activity with #stravaart in its description. The strava-art
// Worker finds and caches those on /sweep (workers/strava-art), and the
// build reads the cache from STRAVA_ART_INDEX_URL — no Strava calls here.

// Commissioned pieces, keyed by activity id. These group under
// "Brand Collaborations".
const BRANDS: Record<number, string> = {
    12479331590:
        'Duolingo reached if they could use the route as promotional material on LinkedIn',
    17223476180:
        'Brand collaboration with the weighted apparel company OMORPHO for their social media',
    17296778475:
        'Commissioned run by Strava as a fun promotion for the 2026 Super Bowl',
}

export const load: PageServerLoad = async ({ fetch }) => {
    // STRAVA_FIXTURE: a saved /art.json for offline builds (see .env.example).
    const cached = env.STRAVA_FIXTURE
        ? loadArtFixture(env.STRAVA_FIXTURE)
        : await fetchArtIndex(env.STRAVA_ART_INDEX_URL, fetch)

    return { activities: toArtActivities(cached, BRANDS) }
}
