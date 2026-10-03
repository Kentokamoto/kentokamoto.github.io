<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLAnchorAttributes } from 'svelte/elements'

    // Surface card. Renders an <a> (with hover affordance) when `href` is set,
    // otherwise a plain <div>. Consumers add display/padding via `class`.
    interface Props extends HTMLAnchorAttributes {
        href?: string
        class?: string
        children: Snippet
    }

    let { href, class: className = '', children, ...rest }: Props = $props()

    const base = 'rounded-xl border border-nord3 bg-nord1'
</script>

{#if href}
    <a
        {href}
        class="{base} hover:border-nord8 transition-colors {className}"
        {...rest}
    >
        {@render children()}
    </a>
{:else}
    <div class="{base} {className}">
        {@render children()}
    </div>
{/if}
