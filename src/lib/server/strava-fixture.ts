import type { StravaActivity } from '$lib/strava-api'

// Offline builds (STRAVA_FIXTURE=fixtures/<name>.json): a saved copy of the
// strava-art Worker's /art.json response, read instead of fetching it.
// Bundled into the server build only (this is $lib/server).
const FIXTURES = import.meta.glob<{ activities: StravaActivity[] }>(
    '/fixtures/*.json',
    { eager: true, import: 'default' }
)

export function loadArtFixture(path: string): StravaActivity[] {
    const fixture = FIXTURES['/' + path.replace(/^\.?\//, '')]
    if (!fixture) {
        throw new Error(
            `STRAVA_FIXTURE=${path} not found; expected one of ${Object.keys(FIXTURES).join(', ') || '(none in fixtures/)'}`
        )
    }
    console.info(
        `[strava] using fixture ${path} (${fixture.activities.length} activities)`
    )
    return fixture.activities
}
