<script lang="ts">
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import Card from '$lib/components/ui/Card.svelte'
    import Button from '$lib/components/ui/Button.svelte'
    import Hatch from '$lib/components/ui/Hatch.svelte'

    const sliceUrl = 'https://kentokamoto.github.io/sliceathon/'
</script>

<!-- HEADER / BIO -->
<Container
    class="grid grid-cols-1 items-start gap-7 pt-12 pb-14 sm:grid-cols-[280px_1fr] sm:gap-14 sm:pt-18"
>
    <Hatch
        label="portrait"
        class="border-nord3 aspect-square max-w-40 rounded-xl border sm:max-w-none"
    />
    <div>
        <Eyebrow class="mb-5 text-sm">// ABOUT</Eyebrow>
        <h1 class="mb-6 text-4xl leading-[1.1] font-bold sm:text-[44px]">
            Kento Okamoto
        </h1>
        <p class="text-nord4 mb-5 text-base leading-[1.75] sm:text-lg">
            Most of my day is spent building software — the kind of work that
            rarely photographs well, so this site leans on the parts of my life
            that do. Lately that means routes plotted to draw shapes across a
            city, and a side commitment to a running team whose race calendar I
            keep alive behind the scenes. Same instinct either way: build the
            thing, make it run, keep it running.
        </p>
        <p class="text-nord4 m-0 text-base leading-[1.75] sm:text-lg">
            Software engineer first — based in Seattle, by way of the Bay Area
            and Denver. Everything else on this site is what I do with the time
            left over.
        </p>
    </div>
</Container>

<!-- SLICE-A-THON -->
<Container class="pb-20 sm:pb-28">
    <Card
        class="flex flex-col items-start justify-between gap-6 p-7 sm:flex-row sm:items-center sm:p-10"
    >
        <div>
            <Eyebrow color="text-nord13" class="mb-2.5">CURRENTLY</Eyebrow>
            <div class="text-nord6 mb-2 text-[22px] font-semibold">
                Slice-a-Thon
            </div>
            <p class="text-nord4 m-0 max-w-[520px] text-[15px] leading-[1.5]">
                I'm the current developer keeping this running team's races
                online.
            </p>
        </div>
        <Button
            href={sliceUrl}
            target="_blank"
            rel="noopener"
            class="whitespace-nowrap"
        >
            Visit site →
        </Button>
    </Card>
</Container>
