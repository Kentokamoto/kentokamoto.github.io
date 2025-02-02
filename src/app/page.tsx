'use client'
import { useState } from 'react'
import Header from './header'
export default function Home() {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>
            <div
                className={`bg-nord4 dark:bg-nord0 absolute top-0 left-0 h-screen w-screen text-4xl duration-300 ease-in-out ${isOpen ? 'opacity-100' : '-translate-y-5 opacity-0'}`}
            >
                <div className="px-4 py-3 sm:flex md:py-4">About</div>
            </div>
            <Header isOpen={isOpen} onOpen={handleOpen} />

            <div className="grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
                <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
                    <p>&#x1F6A7; Check back later &#x1F6A7;</p>
                </main>
                <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6"></footer>
            </div>
        </div>
    )
}
