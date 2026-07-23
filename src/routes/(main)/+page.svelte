<script lang="ts">
    const sliceUrl = 'https://kentokamoto.github.io/sliceathon/'
</script>

<!-- HERO -->
<section class="mx-auto max-w-[1100px] px-8 pt-16 pb-14 sm:pt-24 sm:pb-20">
    <div class="eyebrow mb-5 text-sm">// HELLO, I'M</div>
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
        <a
            href="/StravaArt"
            class="bg-nord8 text-nord0 hover:bg-nord7 inline-flex items-center gap-2.5 rounded-md px-5 py-3.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold transition-colors"
        >
            View Strava Art →
        </a>
        <a
            href="/about"
            class="border-nord3 text-nord6 hover:border-nord8 inline-flex items-center gap-2.5 rounded-md border bg-transparent px-5 py-3.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold transition-colors"
        >
            About me
        </a>
    </div>
</section>

<!-- CURRENT JOURNEY -->
<section class="mx-auto max-w-[1100px] px-8 pb-16 sm:pb-24">
    <div class="border-nord3 bg-nord1 rounded-xl border p-7 sm:p-12">
        <div class="eyebrow text-nord7 mb-4">// CURRENT JOURNEY</div>
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
    </div>
</section>

<!-- HIGHLIGHTS -->
<section
    class="mx-auto grid max-w-[1100px] grid-cols-1 gap-6 px-8 pb-20 sm:grid-cols-2 sm:pb-28"
>
    <a
        href="/StravaArt"
        class="border-nord3 bg-nord1 hover:border-nord8 block overflow-hidden rounded-xl border transition-colors"
    >
        <div class="hatch flex h-40 items-center justify-center">
            <span
                class="text-nord9 font-[family-name:var(--font-jetbrains-mono)] text-[13px]"
                >route preview</span
            >
        </div>
        <div class="p-6">
            <div class="text-nord6 mb-2 text-xl font-semibold">Strava Art</div>
            <p class="text-nord4 m-0 text-[15px] leading-[1.5]">
                A gallery of routes drawn one mile at a time — brand collabs and
                personal pieces.
            </p>
        </div>
    </a>
    <div
        class="border-nord3 bg-nord1 flex flex-col justify-between rounded-xl border p-6"
    >
        <div>
            <div class="eyebrow text-nord13 mb-3">CURRENTLY</div>
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
            class="text-nord8 hover:text-nord7 font-[family-name:var(--font-jetbrains-mono)] text-sm"
        >
            sliceathon →
        </a>
    </div>
</section>
