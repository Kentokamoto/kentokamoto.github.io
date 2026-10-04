<script lang="ts">
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import StravaArtCard from '$lib/components/StravaArtCard.svelte'
    import type { ArtActivity } from '$lib/strava'

    let { data } = $props()

    const brandPieces = $derived(data.activities.filter((a) => a.brand))
    const personalPieces = $derived(data.activities.filter((a) => !a.brand))
    const hasArt = $derived(data.activities.length > 0)
</script>

{#snippet activityList(items: ArtActivity[])}
    <div class="grid gap-6 md:grid-cols-2">
        {#each items as activity (activity.id)}
            <StravaArtCard {activity} />
        {/each}
    </div>
{/snippet}

<!-- HEADER -->
<Container class="pt-12 pb-10 sm:pt-18 sm:pb-14">
    <Eyebrow class="mb-5 text-sm">// PORTFOLIO</Eyebrow>
    <h1
        class="mb-5 text-4xl leading-[1.05] font-bold tracking-[-0.01em] sm:text-[56px]"
    >
        Strava Art
    </h1>
    <p
        class="text-nord4 m-0 mb-5 max-w-[680px] text-base leading-[1.75] sm:text-lg"
    >
        The city streets are my canvas; I just piece them together into art that
        I run. I've been doing GPS art since 2023, usually one route a month,
        sometimes two if I'm feeling extra inspired. It started as a way to make
        my longer runs more interesting, but soon turned into a fun project for
        myself.
    </p>
    <p class="text-nord4 m-0 max-w-[680px] text-base leading-[1.75] sm:text-lg">
        My current style sticks to roads, trails and paths only, in one
        continuous line, with no clever tricks like stopping and starting my
        watch to get around obstacles. When a route is too long to finish in
        daylight, or I simply run out of energy, I'll split it across multiple
        days, picking up exactly where I left off. I've also been lucky enough
        to have a couple of brands reach out to collaborate, which has been such
        a cool experience!
    </p>
</Container>

{#if hasArt}
    {#if brandPieces.length > 0}
        <!-- BRAND COLLABORATIONS -->
        <Container class="pb-16">
            <Eyebrow color="text-nord13" class="mb-6"
                >// BRAND COLLABORATIONS</Eyebrow
            >
            {@render activityList(brandPieces)}
        </Container>
    {/if}

    <!-- PERSONAL PIECES -->
    <Container class="pb-20 sm:pb-28">
        <Eyebrow class="mb-6">// PERSONAL PIECES</Eyebrow>
        {@render activityList(personalPieces)}
    </Container>
{:else}
    <!-- FALLBACK: art cache empty or unreachable at build time -->
    <Container class="pb-20 sm:pb-28">
        <p class="text-nord4">
            The gallery is taking a rest day. In the meantime, see every route
            on
            <a
                href="https://www.strava.com/athletes/43773325"
                target="_blank"
                rel="noopener"
                class="text-nord8 hover:underline">Strava</a
            >.
        </p>
    </Container>
{/if}
