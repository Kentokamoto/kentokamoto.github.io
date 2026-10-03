<script lang="ts">
    import '../app.css'

    let { children } = $props()
</script>

<svelte:head>
    <title>Kento Okamoto</title>
    <meta
        name="description"
        content="Software engineer who draws with GPS routes and keeps a running team's race calendar alive."
    />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

{@render children()}
