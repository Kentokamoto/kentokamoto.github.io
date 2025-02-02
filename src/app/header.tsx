'use client'
import { useState } from 'react'

export default function Header() {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    return (
        <header className="flex flex-row-reverse sm:flex-row text-4xl md:text-2xl">
            <div className="hidden sm:flex px-4 py-3 md:py-4 ">About</div>
            <button
                className="flex flex-col sm:hidden px-4 py-3"
                onClick={handleOpen}
            >
                <span
                    className={`block w-7 h-1 m-0.75 rounded-xs bg-white origin-top-left ${isOpen ? 'duration-300  rotate-45 translate-y-1/5' : 'duration-300'}`}
                ></span>
                <span
                    className={`block w-7 h-1 m-0.75 rounded-xs ${isOpen ? 'duration-300  bg-black' : 'duration-300 bg-white'}`}
                ></span>
                <span
                    className={`block w-7 h-1 m-0.75 rounded-xs bg-white origin-bottom-left ${isOpen ? 'duration-300  -rotate-45 -translate-y-1/5' : 'duration-300'}`}
                ></span>
            </button>
        </header>
    )
}
