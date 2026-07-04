<script lang="ts">
    import '../app.css'
    import Header from '$lib/components/Header.svelte'
    import Footer from '$lib/components/Footer.svelte'

    let { children } = $props()
</script>

<svelte:head>
    <title>Kento Okamoto</title>
    <meta name="description" content="mediocre programmer at best" />
    <link rel="icon" href="/favicon.ico" />
</svelte:head>

<Header />
<main>
    {@render children()}
</main>
<Footer />
