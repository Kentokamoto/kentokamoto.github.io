'use client'
import Header from './header'
export default function Home() {
    return (
        <div>
            <Header />

            <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
                <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                    <p>&#x1F6A7; Check back later &#x1F6A7;</p>
                </main>
                <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
            </div>
        </div>
    )
}
