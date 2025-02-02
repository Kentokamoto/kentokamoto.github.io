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
            <Header isOpen={isOpen} onOpen={handleOpen} />
            <div
                className={`text-4xl absolute h-screen top-0 left-0 bg-black duration-300 w-screen ease-in-out ${isOpen ? 'opacity-100' : 'opacity-0 -translate-y-5'}`}
            >
                <div className="sm:flex px-4 py-3 md:py-4">About</div>
            </div>
            <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
                <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
                    <p>&#x1F6A7; Check back later &#x1F6A7;</p>
                </main>
                <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
            </div>
        </div>
    )
}
