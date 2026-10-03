<script lang="ts">
    import type { Snippet } from 'svelte'

    // CTA button. Renders an <a> when `href` is set, otherwise a <button>.
    interface Props {
        href?: string
        variant?: 'primary' | 'secondary'
        class?: string
        children: Snippet
        [key: string]: unknown
    }

    let {
        href,
        variant = 'primary',
        class: className = '',
        children,
        ...rest
    }: Props = $props()

    const base =
        'inline-flex items-center gap-2.5 rounded-md px-5 py-3.5 font-jetbrains-mono text-sm font-semibold transition-colors'

    const variants = {
        primary: 'bg-nord8 text-nord0 hover:bg-nord7',
        secondary:
            'border border-nord3 bg-transparent text-nord6 hover:border-nord8',
    }
</script>

{#if href}
    <a {href} class="{base} {variants[variant]} {className}" {...rest}>
        {@render children()}
    </a>
{:else}
    <button class="{base} {variants[variant]} {className}" {...rest}>
        {@render children()}
    </button>
{/if}
