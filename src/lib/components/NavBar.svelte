<script lang="ts">
    let isOpen = $state(false)

    const handleOpen = () => {
        isOpen = !isOpen
    }
</script>

<div
    class={`bg-nord4 dark:bg-nord0 absolute top-0 left-0 -z-1 flex h-screen w-screen flex-col place-content-center text-4xl duration-300 ease-in-out ${isOpen ? 'z-20 opacity-100' : '-translate-y-5 opacity-0'}`}
>
    <div class="px-4 py-3 text-right sm:flex md:py-4">
        <a href="/" data-sveltekit-replacestate onclick={handleOpen}>About</a>
    </div>
    <div class="px-4 py-3 text-right sm:flex md:py-4">Resume</div>
    <div class="px-4 py-3 text-right sm:flex md:py-4">
        <a href="/StravaArt" onclick={handleOpen}>Strava Art</a>
    </div>
    <div class="px-4 py-3 text-right sm:flex md:py-4">
        <a href="https://kentokamoto.github.io/sliceathon/">Slice-a-Thon</a>
    </div>
</div>
<div class="hidden px-4 py-3 sm:flex md:py-4">
    <a href="/" data-sveltekit-replacestate>About</a>
</div>
<div class="hidden px-4 py-3 sm:flex md:py-4">Resume</div>
<div class="hidden px-4 py-3 sm:flex md:py-4">
    <a href="/StravaArt">Strava Art</a>
</div>
<div class="hidden px-4 py-3 sm:flex md:py-4">
    <a href="https://kentokamoto.github.io/sliceathon/">Slice-a-Thon</a>
</div>
<button
    class="z-50 flex flex-col px-4 py-3 sm:-z-20 sm:hidden"
    onclick={handleOpen}
    aria-label="Toggle navigation menu"
>
    <span
        class={`dark:bg-nord4 bg-nord0 m-0.75 block h-1 w-7 origin-top-left rounded-xs ${isOpen ? 'translate-x-1/5 translate-y-1/5 rotate-45 duration-300' : 'duration-300'}`}
    ></span>
    <span
        class={`m-0.75 block h-1 w-7 rounded-xs ${isOpen ? 'invisible duration-300' : 'dark:bg-nord4 bg-nord0 duration-300'}`}
    ></span>
    <span
        class={`bg-nord0 dark:bg-nord4 m-0.75 block h-1 w-7 origin-bottom-left rounded-xs ${isOpen ? 'translate-x-1/5 -translate-y-1/5 -rotate-45 duration-300' : 'duration-300'}`}
    ></span>
</button>
