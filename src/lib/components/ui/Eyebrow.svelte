<script lang="ts">
    import type { Snippet } from 'svelte'

    // Mono `// LABEL` section eyebrow. Default frost accent; pass a Tailwind
    // text-color class (e.g. "text-nord13") to recolor.
    interface Props {
        color?: string
        class?: string
        children: Snippet
    }

    let {
        color = 'text-nord8',
        class: className = '',
        children,
    }: Props = $props()
</script>

<div class="eyebrow {color} {className}">
    {@render children()}
</div>
