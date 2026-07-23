<script lang="ts">
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import Card from '$lib/components/ui/Card.svelte'
    import Hatch from '$lib/components/ui/Hatch.svelte'

    // Real activities — the linktree grid opens each one on Strava.
    const activityIds = [
        15971048708, 15560514307, 15321565084, 15244547112, 12925466896,
        12862826754, 12760761570, 12479331590, 12243041155,
    ]

    const moreLinks = [
        { label: 'Full Strava Art portfolio', href: '/StravaArt' },
        { label: 'kentokamoto.com', href: '/' },
        {
            label: 'Slice-a-Thon',
            href: 'https://kentokamoto.github.io/sliceathon/',
        },
        { label: 'GitHub', href: 'https://github.com/Kentokamoto' },
    ]

    const isExternal = (href: string) => href.startsWith('http')
</script>

<div class="flex min-h-screen justify-center">
    <div class="w-full max-w-[480px] px-4 pt-14 pb-16">
        <!-- PROFILE HEADER -->
        <div class="mb-8 flex flex-col items-center px-2 text-center">
            <Hatch
                label="photo"
                class="border-nord3 mb-4 h-[88px] w-[88px] rounded-full border"
            />
            <div class="text-nord6 mb-1.5 text-[22px] font-bold">
                Kento Okamoto
            </div>
            <div class="font-jetbrains-mono text-nord8 mb-3.5 text-[13px]">
                software engineer · strava art
            </div>
            <p class="text-nord4 m-0 max-w-[340px] text-sm leading-[1.5]">
                Tap any route below to open the activity on Strava.
            </p>
        </div>

        <!-- IG-STYLE GRID -->
        <div class="mb-8 grid grid-cols-3 gap-1">
            {#each activityIds as id (id)}
                <a
                    href={`https://www.strava.com/activities/${id}`}
                    target="_blank"
                    rel="noopener"
                    class="hatch group relative block aspect-square overflow-hidden"
                >
                    <div
                        class="bg-nord0/80 absolute inset-0 flex flex-col items-center justify-center p-2.5 text-center opacity-0 transition-opacity duration-150 group-hover:opacity-100"
                    >
                        <div
                            class="font-jetbrains-mono text-nord14 text-[10px]"
                        >
                            open on Strava →
                        </div>
                    </div>
                </a>
            {/each}
        </div>

        <!-- MORE LINKS -->
        <Eyebrow class="mb-3.5 pl-1 text-xs">// MORE</Eyebrow>

        {#each moreLinks as link (link.label)}
            <Card
                href={link.href}
                target={isExternal(link.href) ? '_blank' : undefined}
                rel={isExternal(link.href) ? 'noopener' : undefined}
                class="mb-3 flex items-center justify-between px-5 py-4"
            >
                <span class="text-nord6 text-[15px] font-semibold"
                    >{link.label}</span
                >
                <span class="text-nord9 text-lg">→</span>
            </Card>
        {/each}

        <div class="font-jetbrains-mono text-nord3 mt-9 text-center text-xs">
            © 2026 Kento Okamoto
        </div>
    </div>
</div>
