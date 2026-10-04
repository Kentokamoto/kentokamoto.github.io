<script lang="ts">
    // Strava Art gallery card: route map on top, then title, description and
    // a one-line date · distance · time stat. Brand pieces get a wider map, a yellow
    // border and a brand pill. Takes the raw ArtActivity from the build and
    // does all formatting here.
    import RouteMap from '$lib/components/ui/RouteMap.svelte'
    import {
        formatDate,
        formatDistance,
        formatDuration,
        type ArtActivity,
    } from '$lib/strava'

    interface Props {
        activity: ArtActivity
    }

    let { activity }: Props = $props()

    const isBrand = $derived(!!activity.brand)
</script>

<!-- The whole card is a link via the title's stretched ::after, rather than
     an <a> wrapper, so the map's attribution links aren't nested in it. -->
<article
    class="bg-nord1 relative overflow-hidden rounded-xl border {isBrand
        ? 'border-nord13'
        : 'border-nord3'}"
>
    <div
        class="{isBrand ? 'aspect-[16/10]' : 'aspect-square'} {activity.polyline
            ? 'bg-nord0'
            : 'hatch'}"
    >
        <RouteMap
            encoded={activity.polyline}
            color="text-strava"
            class="h-full w-full"
        />
    </div>

    <div class={isBrand ? 'p-6' : 'p-5'}>
        {#if activity.brand}
            <span
                class="bg-nord13 font-jetbrains-mono text-nord0 mb-3.5 inline-block rounded px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em] uppercase"
            >
                {activity.brand}
            </span>
        {/if}
        <h3
            class="text-nord6 mb-1.5 font-semibold {isBrand
                ? 'text-[19px]'
                : 'text-[17px]'}"
        >
            <a
                href={activity.href}
                target="_blank"
                rel="noopener"
                class="after:absolute after:inset-0 after:z-[1] after:content-['']"
            >
                {activity.name}
            </a>
        </h3>
        {#if activity.description}
            <p
                class="mb-3.5 line-clamp-3 leading-normal whitespace-pre-line text-[#9AA5B8] {isBrand
                    ? 'text-sm'
                    : 'text-[13.5px]'}"
            >
                {activity.description}
            </p>
        {/if}
        <div
            class="font-jetbrains-mono text-nord14 flex flex-wrap gap-x-4 text-xs"
        >
            <time datetime={activity.startDate} class="text-nord4">
                {formatDate(activity.startDateLocal)}
            </time>
            <span class="text-nord3" aria-hidden="true">·</span>
            <span>{formatDistance(activity.distance)}</span>
            <span class="text-nord3" aria-hidden="true">·</span>
            <span>{formatDuration(activity.movingTime)}</span>
        </div>
    </div>
</article>
