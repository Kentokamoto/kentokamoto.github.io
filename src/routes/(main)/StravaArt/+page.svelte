<script lang="ts">
    import { onMount } from 'svelte'
    import StravaActivity from '$lib/components/StravaActivity.svelte'
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import Card from '$lib/components/ui/Card.svelte'
    import RouteArt from '$lib/components/ui/RouteArt.svelte'
    import type { RoutePiece } from '$lib/strava'

    let { data } = $props()

    const brandPieces = $derived(data.pieces.filter((p) => p.brand))
    const personalPieces = $derived(data.pieces.filter((p) => !p.brand))
    const hasArt = $derived(data.pieces.length > 0)

    onMount(() => {
        // Only load the legacy embed script when we're falling back (no API data).
        if (hasArt) return
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

{#snippet pieceCard(piece: RoutePiece, aspect: string)}
    <Card
        href={piece.href}
        target="_blank"
        rel="noopener"
        class={`block overflow-hidden ${piece.brand ? 'border-nord13! hover:border-nord13!' : ''}`}
    >
        <div class="flex {aspect} items-center justify-center bg-nord2">
            <RouteArt
                path={piece.path}
                color={piece.brand ? 'text-nord13' : 'text-nord8'}
                class="h-full w-full p-4"
            />
        </div>
        <div class="p-5">
            {#if piece.brand}
                <div
                    class="mb-3 inline-block rounded bg-nord13 px-2.5 py-1 font-jetbrains-mono text-[11px] font-semibold tracking-[0.04em] text-nord0"
                >
                    {piece.brand}
                </div>
            {/if}
            <div class="mb-1.5 text-lg font-semibold text-nord6">
                {piece.name}
            </div>
            <div class="flex gap-4 font-jetbrains-mono text-xs text-nord14">
                <span>{piece.distanceMi}</span>
                <span class="text-nord3">·</span>
                <span>{piece.duration}</span>
            </div>
        </div>
    </Card>
{/snippet}

<!-- HEADER -->
<Container class="pt-12 pb-10 sm:pt-18 sm:pb-14">
    <Eyebrow class="mb-5 text-sm">// PORTFOLIO</Eyebrow>
    <h1
        class="mb-5 text-4xl leading-[1.05] font-bold tracking-[-0.01em] sm:text-[56px]"
    >
        Strava Art
    </h1>
    <p class="m-0 max-w-[680px] text-[17px] leading-[1.6] text-nord4 sm:text-xl">
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
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {#each brandPieces as piece (piece.id)}
                    {@render pieceCard(piece, 'aspect-[16/10]')}
                {/each}
            </div>
        </Container>
    {/if}

    <!-- PERSONAL PIECES -->
    <Container class="pb-20 sm:pb-28">
        <Eyebrow class="mb-6">// PERSONAL PIECES</Eyebrow>
        <div
            class="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6"
        >
            {#each personalPieces as piece (piece.id)}
                {@render pieceCard(piece, 'aspect-square')}
            {/each}
        </div>
    </Container>
{:else}
    <!-- FALLBACK: legacy embeds (no Strava credentials configured) -->
    <Container class="pb-20 sm:pb-28">
        <Eyebrow color="text-nord13" class="mb-6">// THE GALLERY</Eyebrow>
        <div class="flex flex-row flex-wrap items-start justify-center gap-2">
            {#each data.fallbackIds as activityId (activityId)}
                <StravaActivity {activityId} />
            {/each}
        </div>
    </Container>
{/if}
