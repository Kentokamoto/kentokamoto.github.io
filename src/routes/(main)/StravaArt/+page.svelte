<script lang="ts">
    import { onMount } from 'svelte'
    import StravaActivity from '$lib/components/StravaActivity.svelte'
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'

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

<!-- HEADER -->
<Container class="pt-12 pb-10 sm:pt-18 sm:pb-14">
    <Eyebrow class="mb-5 text-sm">// PORTFOLIO</Eyebrow>
    <h1
        class="mb-5 text-4xl leading-[1.05] font-bold tracking-[-0.01em] sm:text-[56px]"
    >
        Strava Art
    </h1>
    <p
        class="text-nord4 m-0 max-w-[680px] text-[17px] leading-[1.6] sm:text-xl"
    >
        Routes plotted mile-by-mile until the map draws something else entirely.
        A mix of brand collaborations and pieces made just for fun — each one
        links out to the real activity on Strava.
    </p>
</Container>

<!-- GALLERY -->
<Container class="pb-20 sm:pb-28">
    <Eyebrow color="text-nord13" class="mb-6">// THE GALLERY</Eyebrow>
    <div class="flex flex-row flex-wrap items-start justify-center gap-2">
        {#each activityIds as activityId (activityId)}
            <StravaActivity {activityId} />
        {/each}
    </div>
</Container>
