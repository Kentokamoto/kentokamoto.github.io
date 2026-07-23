<script lang="ts">
    import { page } from '$app/state'

    const links = [
        { href: '/', label: 'home' },
        { href: '/StravaArt', label: 'strava art' },
        { href: '/about', label: 'about' },
    ]

    // Active when the path matches exactly, or (for non-root) is a subpath.
    const isActive = (href: string) =>
        href === '/'
            ? page.url.pathname === '/'
            : page.url.pathname === href ||
              page.url.pathname.startsWith(href + '/')
</script>

<nav
    class="mx-auto flex w-full max-w-[1100px] items-center justify-between px-8 py-7"
>
    <a
        href="/"
        class="text-nord6 font-jetbrains-mono text-[15px] font-semibold tracking-[0.02em]"
    >
        kento<span class="text-nord8">.</span>okamoto
    </a>
    <div class="font-jetbrains-mono flex gap-5 text-[13px] sm:gap-7 sm:text-sm">
        {#each links as link (link.href)}
            <a
                href={link.href}
                class={isActive(link.href)
                    ? 'text-nord8'
                    : 'text-nord4 hover:text-nord7'}
            >
                {link.label}
            </a>
        {/each}
    </div>
</nav>
