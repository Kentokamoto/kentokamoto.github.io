<script lang="ts">
    import { onMount } from 'svelte'
    import StravaActivity from '$lib/components/StravaActivity.svelte'

    const blurb = ''

    const activityIds = [
        15971048708, 15560514307, 15321565084, 15244547112, 12925466896,
        12862826754, 12760761570, 12479331590, 12243041155, 12003541925,
        11615247255, 11083832787, 10764220229, 10743237192, 10553302412,
        10528377100, 10474820310, 10396237868, 10265830140, 10208737283,
    ]

    onMount(() => {
        // Load the Strava embed script once; it hydrates the placeholders on load.
        if (
            !document.querySelector(
                'script[src="https://strava-embeds.com/embed.js"]'
            )
        ) {
            const script = document.createElement('script')
            script.src = 'https://strava-embeds.com/embed.js'
            document.body.appendChild(script)
        }
    })
</script>

<div class="flex flex-col p-8 pb-20">
    <div>
        <p>{blurb}</p>
    </div>
    <div class="flex flex-row flex-wrap items-center justify-center">
        {#each activityIds as activityId (activityId)}
            <StravaActivity {activityId} />
        {/each}
    </div>
</div>
