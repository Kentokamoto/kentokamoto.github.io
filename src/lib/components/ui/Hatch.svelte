<script lang="ts">
    // Diagonal-hatched placeholder standing in for a route image / photo.
    // Sizing (height, aspect, radius) comes from the consumer via `class`.
    interface Props {
        label?: string
        class?: string
    }

    let { label = '', class: className = '' }: Props = $props()
</script>

<div class="hatch flex items-center justify-center {className}">
    {#if label}
        <span class="font-jetbrains-mono text-nord9 text-[11px]">{label}</span>
    {/if}
</div>
