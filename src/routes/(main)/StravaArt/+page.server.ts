import { env } from '$env/dynamic/private'
import { fetchRoutePieces, type PieceSeed } from '$lib/strava'
import type { PageServerLoad } from './$types'

// Curated activities, in display order. Add `brand` to tag a commissioned
// piece — those render with a gold accent and group under "Brand Collaborations".
const PIECES: PieceSeed[] = [
    { id: 15971048708 },
    { id: 15560514307 },
    { id: 15321565084 },
    { id: 15244547112 },
    { id: 12925466896 },
    { id: 12862826754 },
    { id: 12760761570 },
    { id: 12479331590 },
    { id: 12243041155 },
    { id: 12003541925 },
    { id: 11615247255 },
    { id: 11083832787 },
    { id: 10764220229 },
    { id: 10743237192 },
    { id: 10553302412 },
    { id: 10528377100 },
    { id: 10474820310 },
    { id: 10396237868 },
    { id: 10265830140 },
    { id: 10208737283 },
]

// Fallback list for when no Strava credentials are configured — the page
// renders the legacy embeds from these instead of baked SVG route art.
const FALLBACK_IDS = PIECES.map((p) => p.id)

export const load: PageServerLoad = async ({ fetch }) => {
    const pieces = await fetchRoutePieces(
        PIECES,
        {
            clientId: env.STRAVA_CLIENT_ID,
            clientSecret: env.STRAVA_CLIENT_SECRET,
            refreshToken: env.STRAVA_REFRESH_TOKEN,
        },
        fetch
    )

    return { pieces, fallbackIds: FALLBACK_IDS }
}
