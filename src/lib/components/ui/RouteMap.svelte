<script lang="ts">
    // A route polyline drawn over a MapLibre map (OpenFreeMap tiles: free, no
    // API key). The SVG trace renders first — at prerender, without JS, and
    // while tiles load — and the map fades in on top once it's ready.
    //
    // Maps are created only while near the viewport and torn down when they
    // leave it: browsers cap live WebGL contexts (~16), so a long gallery of
    // always-on maps would start losing the oldest ones.
    import { onMount } from 'svelte'
    import polyline from '@mapbox/polyline'
    import RouteArt from './RouteArt.svelte'
    import { polylineToPath } from '$lib/strava'
    import type { Map as MapLibreMap } from 'maplibre-gl'

    interface Props {
        /** Encoded (Strava summary) polyline. */
        encoded: string | null
        /** Tailwind text-color class — also used for the map's route line. */
        color?: string
        /** Allow pan/zoom. Off by default so the map behaves like an image. */
        interactive?: boolean
        class?: string
    }

    let {
        encoded,
        color = 'text-nord8',
        interactive = false,
        class: className = '',
    }: Props = $props()

    const STYLE_URL = 'https://tiles.openfreemap.org/styles/fiord'

    const path = $derived(polylineToPath(encoded))
    // GeoJSON wants [lng, lat]; polyline.decode returns [lat, lng].
    const coords = $derived(
        encoded ? polyline.decode(encoded).map(([lat, lng]) => [lng, lat]) : []
    )

    let root: HTMLDivElement
    let container: HTMLDivElement
    let ready = $state(false)

    onMount(() => {
        if (coords.length < 2) return

        let map: MapLibreMap | null = null
        let cancelled = false

        async function create() {
            const [{ Map, setWorkerUrl }, { default: workerUrl }] =
                await Promise.all([
                    import('maplibre-gl'),
                    import('maplibre-gl/dist/maplibre-gl-worker.mjs?worker&url'),
                    import('maplibre-gl/dist/maplibre-gl.css'),
                ])
            if (cancelled || map) return
            setWorkerUrl(workerUrl)

            const lngs = coords.map((c) => c[0])
            const lats = coords.map((c) => c[1])
            // Resolve the Tailwind color class to a real color for WebGL.
            const lineColor = getComputedStyle(root).color

            map = new Map({
                container,
                style: STYLE_URL,
                bounds: [
                    [Math.min(...lngs), Math.min(...lats)],
                    [Math.max(...lngs), Math.max(...lats)],
                ],
                fitBoundsOptions: { padding: 24 },
                interactive,
                attributionControl: { compact: true },
            })
            map.on('load', () => {
                map!.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: { type: 'LineString', coordinates: coords },
                    },
                })
                const layout = {
                    'line-cap': 'round',
                    'line-join': 'round',
                } as const
                map!.addLayer({
                    id: 'route-casing',
                    type: 'line',
                    source: 'route',
                    layout,
                    paint: { 'line-color': '#2e3440', 'line-width': 6 },
                })
                map!.addLayer({
                    id: 'route',
                    type: 'line',
                    source: 'route',
                    layout,
                    paint: { 'line-color': lineColor, 'line-width': 3 },
                })
                map!.once('idle', () => (ready = true))
            })
        }

        function destroy() {
            map?.remove()
            map = null
            ready = false
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    cancelled = false
                    create()
                } else {
                    cancelled = true
                    destroy()
                }
            },
            { rootMargin: '300px' }
        )
        observer.observe(root)

        return () => {
            cancelled = true
            observer.disconnect()
            destroy()
        }
    })
</script>

<div bind:this={root} class="relative {color} {className}">
    <RouteArt
        {path}
        {color}
        class="absolute inset-0 p-6 transition-opacity duration-500 {ready
            ? 'opacity-0'
            : ''}"
    />
    <div
        bind:this={container}
        class="absolute inset-0 transition-opacity duration-500 {ready
            ? 'opacity-100'
            : 'opacity-0'}"
    ></div>
</div>
