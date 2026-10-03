<script lang="ts">
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import { formatDistance, type ArtActivity } from '$lib/strava'

    let { data } = $props()

    const brandPieces = $derived(data.activities.filter((a) => a.brand))
    const personalPieces = $derived(data.activities.filter((a) => !a.brand))
    const hasArt = $derived(data.activities.length > 0)
</script>

<!-- Placeholder list until the activity cards are designed. -->
{#snippet activityList(items: ArtActivity[])}
    <ul class="divide-nord3 border-nord3 divide-y border-y">
        {#each items as activity (activity.id)}
            <li>
                <a
                    href={activity.href}
                    target="_blank"
                    rel="noopener"
                    class="group flex items-baseline justify-between gap-4 py-3"
                >
                    <span
                        class="text-nord6 group-hover:text-nord8 font-semibold transition-colors"
                        >{activity.name}</span
                    >
                    <span
                        class="font-jetbrains-mono text-nord4 shrink-0 text-xs"
                    >
                        {activity.startDateLocal.slice(0, 10)} ·
                        {formatDistance(activity.distance)}
                    </span>
                </a>
            </li>
        {/each}
    </ul>
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
        class="text-nord4 m-0 max-w-[680px] text-[17px] leading-[1.6] sm:text-xl"
    >
        Routes plotted mile-by-mile until the map draws something else entirely.
        A mix of brand collaborations and pieces made just for fun — each one
        links out to the real activity on Strava.
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
