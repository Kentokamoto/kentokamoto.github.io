'use client'
export default function Home() {
    const introBlurb = `Hello 👋! I'm Kento. I write code. Sometimes the
computer does what I want it to do; most of the time, it doesn't. Currently 
based in Seattle Washington but have also lived in the Bay Area and Denver
area.`
    return (
        <div>
            <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
                <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                    <p>{introBlurb}</p>
                </main>
                <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
            </div>
        </div>
    )
}
