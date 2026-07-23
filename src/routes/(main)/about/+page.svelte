<script lang="ts">
    const sliceUrl = 'https://kentokamoto.github.io/sliceathon/'
</script>

<!-- HEADER / BIO -->
<section
    class="mx-auto grid max-w-[1100px] grid-cols-1 items-start gap-7 px-8 pt-12 pb-14 sm:grid-cols-[280px_1fr] sm:gap-14 sm:pt-18 sm:pb-14"
>
    <div
        class="hatch border-nord3 flex aspect-square max-w-40 items-center justify-center rounded-xl border sm:max-w-none"
    >
        <span
            class="text-nord9 font-[family-name:var(--font-jetbrains-mono)] text-xs"
            >portrait</span
        >
    </div>
    <div>
        <div class="eyebrow mb-5 text-sm">// ABOUT</div>
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
</section>

<!-- SLICE-A-THON -->
<section class="mx-auto max-w-[1100px] px-8 pb-20 sm:pb-28">
    <div
        class="border-nord3 bg-nord1 flex flex-col items-start justify-between gap-6 rounded-xl border p-7 sm:flex-row sm:items-center sm:p-10"
    >
        <div>
            <div class="eyebrow text-nord13 mb-2.5">CURRENTLY</div>
            <div class="text-nord6 mb-2 text-[22px] font-semibold">
                Slice-a-Thon
            </div>
            <p class="text-nord4 m-0 max-w-[520px] text-[15px] leading-[1.5]">
                I'm the current developer keeping this running team's races
                online.
            </p>
        </div>
        <a
            href={sliceUrl}
            target="_blank"
            rel="noopener"
            class="bg-nord8 text-nord0 hover:bg-nord7 inline-flex items-center gap-2.5 rounded-md px-5 py-3.5 font-[family-name:var(--font-jetbrains-mono)] text-sm font-semibold whitespace-nowrap transition-colors"
        >
            Visit site →
        </a>
    </div>
</section>
