<script lang="ts">
    // Strava-style activity card: athlete header, title + description, stat
    // row, route map, and a kudos / "View on Strava" footer. Takes the raw
    // ArtActivity from the build and does all formatting here.
    import RouteArt from '$lib/components/ui/RouteArt.svelte'
    import {
        formatDistance,
        formatDuration,
        formatElevation,
        formatPaceOrSpeed,
        polylineToPath,
        type ArtActivity,
    } from '$lib/strava'

    interface Props {
        activity: ArtActivity
        athlete?: string
    }

    let { activity, athlete = 'Kento Okamoto' }: Props = $props()

    const initials = $derived(
        athlete
            .split(/\s+/)
            .map((w) => w[0])
            .join('')
            .slice(0, 2)
    )

    // start_date_local is wall-clock time tagged with a Z, so format it in
    // UTC to show it as recorded (and identically on server and client).
    const date = $derived(
        new Intl.DateTimeFormat('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            timeZone: 'UTC',
        }).format(new Date(activity.startDateLocal))
    )

    const sport = $derived(
        activity.sportType.replace(/([a-z])([A-Z])/g, '$1 $2')
    )

    const stats = $derived(
        [
            { label: 'Distance', value: formatDistance(activity.distance) },
            formatPaceOrSpeed(
                activity.sportType,
                activity.distance,
                activity.movingTime
            ),
            { label: 'Time', value: formatDuration(activity.movingTime) },
            activity.elevationGain > 0
                ? {
                      label: 'Elev Gain',
                      value: formatElevation(activity.elevationGain),
                  }
                : null,
        ].filter((s) => s !== null)
    )

    const path = $derived(polylineToPath(activity.polyline))
</script>

<article
    class="bg-nord1 flex flex-col overflow-hidden rounded-xl border {activity.brand
        ? 'border-nord13'
        : 'border-nord3'}"
>
    <!-- Athlete header -->
    <header class="flex items-start gap-3 px-5 pt-5">
        <div
            class="bg-nord3 font-jetbrains-mono text-nord6 flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
            aria-hidden="true"
        >
            {initials}
        </div>
        <div class="min-w-0 flex-1">
            <div class="text-nord6 font-semibold">{athlete}</div>
            <div class="font-jetbrains-mono text-nord4 text-xs">
                <time datetime={activity.startDate}>{date}</time>
                <span class="text-nord3">·</span>
                {sport}
            </div>
        </div>
        {#if activity.brand}
            <span
                class="bg-nord13 font-jetbrains-mono text-nord0 shrink-0 rounded px-2.5 py-1 text-[11px] font-semibold tracking-[0.04em]"
            >
                {activity.brand}
            </span>
        {/if}
    </header>

    <!-- Title + description -->
    <div class="px-5 pt-4">
        <h3 class="text-nord6 text-xl leading-snug font-bold">
            <a
                href={activity.href}
                target="_blank"
                rel="noopener"
                class="transition-colors {activity.brand
                    ? 'hover:text-nord13'
                    : 'hover:text-nord8'}"
            >
                {activity.name}
            </a>
        </h3>
        {#if activity.description}
            <p
                class="text-nord4 mt-2 line-clamp-3 text-[15px] leading-relaxed whitespace-pre-line"
            >
                {activity.description}
            </p>
        {/if}
    </div>

    <!-- Stats -->
    <dl class="flex flex-wrap gap-x-6 gap-y-3 px-5 pt-4 pb-5">
        {#each stats as stat (stat.label)}
            <div>
                <dt class="text-nord4 text-xs">{stat.label}</dt>
                <dd class="text-nord6 text-lg font-semibold">{stat.value}</dd>
            </div>
        {/each}
    </dl>

    <!-- Route map -->
    <a
        href={activity.href}
        target="_blank"
        rel="noopener"
        class="border-nord3 bg-nord0 block aspect-[4/3] border-y"
        aria-label="Route for {activity.name} on Strava"
    >
        <RouteArt
            {path}
            color={activity.brand ? 'text-nord13' : 'text-nord8'}
            class="h-full w-full p-6"
        />
    </a>

    <!-- Footer -->
    <footer
        class="font-jetbrains-mono flex items-center justify-between px-5 py-3 text-xs"
    >
        <span class="text-nord4 flex items-center gap-1.5">
            <svg
                viewBox="0 0 24 24"
                class="size-4"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
            >
                <path
                    d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"
                />
            </svg>
            {activity.kudos.toLocaleString('en-US')}
            <span class="sr-only">kudos</span>
        </span>
        <a
            href={activity.href}
            target="_blank"
            rel="noopener"
            class="font-bold text-[#fc5200] hover:underline"
        >
            View on Strava
        </a>
    </footer>
</article>
