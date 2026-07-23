<script lang="ts">
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import Card from '$lib/components/ui/Card.svelte'
    import Button from '$lib/components/ui/Button.svelte'
    import Hatch from '$lib/components/ui/Hatch.svelte'

    const sliceUrl = 'https://kentokamoto.github.io/sliceathon/'
</script>

<!-- HERO -->
<Container class="pt-16 pb-14 sm:pt-24 sm:pb-20">
    <Eyebrow class="mb-5 text-sm">// HELLO, I'M</Eyebrow>
    <h1
        class="mb-6 text-5xl leading-[1.02] font-bold tracking-[-0.02em] sm:text-[88px]"
    >
        Kento<br />Okamoto
    </h1>
    <p class="text-nord4 mb-9 max-w-[640px] text-xl leading-[1.5] sm:text-2xl">
        First and foremost, a <span class="text-nord6 font-semibold"
            >software engineer</span
        >. Outside of that — I draw with GPS routes and keep a race calendar
        running for a team that isn't mine, but feels like it.
    </p>
    <div class="flex flex-wrap gap-4">
        <Button href="/StravaArt">View Strava Art →</Button>
        <Button href="/about" variant="secondary">About me</Button>
    </div>
</Container>

<!-- CURRENT JOURNEY -->
<Container class="pb-16 sm:pb-24">
    <Card class="p-7 sm:p-12">
        <Eyebrow color="text-nord7" class="mb-4">// CURRENT JOURNEY</Eyebrow>
        <p
            class="text-nord4 m-0 max-w-[760px] text-base leading-[1.75] sm:text-lg"
        >
            Most of my day is spent building software — the kind of work that
            rarely photographs well, so this site leans on the parts of my life
            that do. Lately that means routes plotted to draw shapes across a
            city, and a side commitment to a running team whose race calendar I
            keep alive behind the scenes. Same instinct either way: build the
            thing, make it run, keep it running.
        </p>
    </Card>
</Container>

<!-- HIGHLIGHTS -->
<Container class="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 sm:pb-28">
    <Card href="/StravaArt" class="block overflow-hidden">
        <Hatch label="route preview" class="h-40" />
        <div class="p-6">
            <div class="text-nord6 mb-2 text-xl font-semibold">Strava Art</div>
            <p class="text-nord4 m-0 text-[15px] leading-[1.5]">
                A gallery of routes drawn one mile at a time — brand collabs and
                personal pieces.
            </p>
        </div>
    </Card>
    <Card class="flex flex-col justify-between p-6">
        <div>
            <Eyebrow color="text-nord13" class="mb-3">CURRENTLY</Eyebrow>
            <div class="text-nord6 mb-2 text-xl font-semibold">
                Slice-a-Thon
            </div>
            <p class="text-nord4 m-0 mb-5 text-[15px] leading-[1.5]">
                I'm the developer keeping this running team's races online.
            </p>
        </div>
        <a
            href={sliceUrl}
            target="_blank"
            rel="noopener"
            class="font-jetbrains-mono text-nord8 hover:text-nord7 text-sm"
        >
            sliceathon →
        </a>
    </Card>
</Container>
