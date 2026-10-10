#!/usr/bin/env node
/**
 * One-time helper to mint a Strava refresh token scoped `activity:read_all`.
 * Runs entirely locally with YOUR credentials — nothing is sent anywhere except
 * to Strava's own OAuth endpoints.
 *
 * Prerequisite: in your Strava app settings (https://www.strava.com/settings/api)
 * set "Authorization Callback Domain" to  localhost
 *
 * Usage (loads STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET from .env):
 *
 *   1. node --env-file=.env scripts/strava-token.mjs authorize
 *      → open the printed URL, click Authorize. Your browser lands on a
 *        "can't be reached" page at  http://localhost/?...&code=XXXX&scope=...
 *        Copy the `code` value out of the address bar.
 *
 *   2. node --env-file=.env scripts/strava-token.mjs exchange <code>
 *      → prints your refresh token. Paste it into .env as STRAVA_REFRESH_TOKEN.
 */

const clientId = process.env.STRAVA_CLIENT_ID
const clientSecret = process.env.STRAVA_CLIENT_SECRET
const [cmd, arg] = process.argv.slice(2)

if (!clientId || !clientSecret) {
    console.error(
        'Missing STRAVA_CLIENT_ID / STRAVA_CLIENT_SECRET.\n' +
            'Run with:  node --env-file=.env scripts/strava-token.mjs ...'
    )
    process.exit(1)
}

if (cmd === 'authorize') {
    const url =
        'https://www.strava.com/oauth/authorize?' +
        new URLSearchParams({
            client_id: clientId,
            redirect_uri: 'http://localhost',
            response_type: 'code',
            approval_prompt: 'force',
            scope: 'activity:read_all',
        })
    console.log(
        '\nOpen this URL, click Authorize, then copy the `code` param:\n'
    )
    console.log(url + '\n')
} else if (cmd === 'exchange') {
    if (!arg) {
        console.error(
            'Usage: node --env-file=.env scripts/strava-token.mjs exchange <code>'
        )
        process.exit(1)
    }
    const res = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            code: arg,
            grant_type: 'authorization_code',
        }),
    })
    const json = await res.json()
    if (!res.ok) {
        console.error('Exchange failed:', res.status, JSON.stringify(json))
        process.exit(1)
    }
    console.log('\nScopes granted:', json.scope || '(check the redirect URL)')
    console.log('\nAdd this to your .env:\n')
    console.log(`STRAVA_REFRESH_TOKEN=${json.refresh_token}\n`)
} else {
    console.error(
        'Unknown command. Use:\n' +
            '  node --env-file=.env scripts/strava-token.mjs authorize\n' +
            '  node --env-file=.env scripts/strava-token.mjs exchange <code>'
    )
    process.exit(1)
}
