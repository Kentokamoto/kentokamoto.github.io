<script lang="ts">
    const socials = [
        { name: 'strava', href: 'https://www.strava.com/athletes/43773325' },
        { name: 'github', href: 'https://github.com/Kentokamoto' },
        {
            name: 'linkedin',
            href: 'https://www.linkedin.com/in/kentokamoto/',
        },
    ]
</script>

<footer class="border-nord2 border-t px-8 py-8">
    <div
        class="mx-auto flex max-w-[1100px] flex-col items-start justify-between gap-3 sm:flex-row sm:items-center"
    >
        <span class="text-nord3 font-jetbrains-mono text-[13px]">
            © 2026 Kento Okamoto
        </span>
        <div class="font-jetbrains-mono flex gap-5 text-[13px]">
            {#each socials as social (social.name)}
                <a
                    href={social.href}
                    target="_blank"
                    rel="noopener"
                    class="text-nord9 hover:text-nord7"
                >
                    {social.name}
                </a>
            {/each}
        </div>
    </div>
</footer>
