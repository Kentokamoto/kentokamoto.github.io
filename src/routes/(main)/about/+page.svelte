<script lang="ts">
    import Container from '$lib/components/ui/Container.svelte'
    import Eyebrow from '$lib/components/ui/Eyebrow.svelte'
    import Card from '$lib/components/ui/Card.svelte'
    import Button from '$lib/components/ui/Button.svelte'
    import portrait from '$lib/assets/portrait.jpeg?w=560;280&enhanced'

    const sliceUrl = 'https://kentokamoto.github.io/sliceathon/'
</script>

<!-- HEADER / BIO -->
<Container
    class="grid grid-cols-1 items-start gap-7 pt-12 pb-14 sm:grid-cols-[280px_1fr] sm:gap-14 sm:pt-18"
>
    <enhanced:img
        src={portrait}
        alt="Kento Okamoto"
        sizes="(min-width: 640px) 280px, 160px"
        fetchpriority="high"
        class="border-nord3 aspect-square w-full max-w-40 rounded-xl border object-cover sm:max-w-none"
    />
    <div>
        <Eyebrow class="mb-5 text-sm">// ABOUT</Eyebrow>
        <h1 class="mb-6 text-4xl leading-[1.1] font-bold sm:text-[44px]">
            Kento Okamoto
        </h1>
        <p class="text-nord4 mb-5 text-base leading-[1.75] sm:text-lg">
            I'm a software engineer in Seattle, currently at
            <a
                href="https://www.headway.co"
                target="_blank"
                rel="noopener"
                class=" text-nord8 hover:text-nord7 hover:underline">Headway</a
            >. Early in my career I jumped around the tech stack, working on
            platform software, payment authorization, and now full-stack web
            development, which is where I feel most comfortable and where I want
            to keep growing.
        </p>

        <p class="text-nord4 mb-5 text-base leading-[1.75] sm:text-lg">
            In college, I was an athlete on the track and field team, mainly as
            a sprinter and long jumper. Strangely, I've since become more of a
            long-distance runner, with a couple of 50Ks behind me. Funny how
            things change, right?
        </p>

        <p class="text-nord4 mb-5 text-base leading-[1.75] sm:text-lg">
            I started turning routes into art in 2023 as a way to make my longer
            runs more interesting. I'd heard of GPS art (now more commonly known
            as Strava art), so I sat down and plotted out a couple of routes
            around Seattle. What I thought would be a short-lived bit turned
            into a monthly project. I still find the drawing and planning
            process a ton of fun, and I hope the people who follow me on Strava
            and Instagram find some joy in the routes I share there.
        </p>
    </div>
</Container>
