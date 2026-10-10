<script lang="ts">
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import Card from '$lib/components/ui/Card.svelte'
    import Button from '$lib/components/ui/Button.svelte'
    import routePreview from '$lib/assets/art/17296778475.jpeg?w=1080;540&enhanced'

    const sliceUrl = 'https://www.sliceenterprise.com'
</script>

<!-- HERO -->
<Container class="pt-16 pb-14 sm:pt-24 sm:pb-20">
    <Eyebrow class="mb-5 text-sm">// HELLO, my name is</Eyebrow>
    <h1
        class="mb-6 text-5xl leading-[1.02] font-bold tracking-[-0.02em] sm:text-[88px]"
    >
        Kento<br />Okamoto
    </h1>
    <p class="text-nord4 mb-9 max-w-[640px] text-xl leading-[1.5] sm:text-2xl">
        Software engineer who also spends too much time running making shapes
        with the streets of Seattle.
    </p>
    <div class="flex flex-wrap gap-4">
        <Button href="/StravaArt">View Strava Art →</Button>
        <Button href="/about" variant="secondary">About me</Button>
    </div>
</Container>

<!-- HIGHLIGHTS -->
<Container class="grid grid-cols-1 gap-6 pb-20 sm:grid-cols-2 sm:pb-28">
    <Card href="/StravaArt" class="block overflow-hidden">
        <enhanced:img
            src={routePreview}
            alt="Strava art route"
            sizes="(min-width: 640px) 540px, 100vw"
            class="h-56 w-full object-cover"
        />
        <div class="p-6">
            <div class="text-nord6 mb-2 text-xl font-semibold">Strava Art</div>
            <p class="text-nord4 m-0 text-[15px] leading-[1.5]">
                A gallery of routes I've drawn and run. Most are personal pieces
                but also include brand collabs I've done as well
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
                Crust or Bust
            </p>
            <p class="text-nord4 m-0 mb-5 text-[15px] leading-[1.5]">
                A half marathon fun run around the city of Seattle eating 3
                slices of pizza every year in the spring!
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
