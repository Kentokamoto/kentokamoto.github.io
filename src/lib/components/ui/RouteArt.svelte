<script lang="ts">
    // Renders a decoded route polyline as an SVG path in a square viewBox.
    // `path` comes pre-computed from the server (see lib/strava.ts).
    interface Props {
        path: string | null
        /** Tailwind text-color class — the stroke uses currentColor. */
        color?: string
        class?: string
    }

    let { path, color = 'text-nord8', class: className = '' }: Props = $props()
</script>

<div class="flex items-center justify-center {color} {className}">
    {#if path}
        <svg
            viewBox="0 0 100 100"
            class="h-full w-full"
            fill="none"
            stroke="currentColor"
            stroke-width="1.6"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
        >
            <path d={path} />
        </svg>
    {:else}
        <span class="font-jetbrains-mono text-[11px] text-nord9">no route</span>
    {/if}
</div>
