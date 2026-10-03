<script lang="ts">
    import type { Snippet } from 'svelte'
    import type { HTMLAttributes } from 'svelte/elements'

    // Page-width wrapper: centers content to 1100px with horizontal padding.
    // Vertical spacing / grid / flex is left to the consumer via `class`.
    interface Props extends HTMLAttributes<HTMLElement> {
        class?: string
        children: Snippet
    }

    let { class: className = '', children, ...rest }: Props = $props()
</script>

<section class="mx-auto w-full max-w-[1100px] px-8 {className}" {...rest}>
    {@render children()}
</section>
