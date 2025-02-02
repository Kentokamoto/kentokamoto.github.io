'use client'

import React from 'react'
import { useState } from 'react'
const NavBar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
            <div
                className={`bg-nord4 dark:bg-nord0 absolute top-0 left-0 flex h-screen w-screen flex-col place-content-center text-4xl duration-300 ease-in-out ${isOpen ? 'opacity-100' : '-translate-y-5 opacity-0'}`}
            >
                <div className="px-4 py-3 text-right sm:flex md:py-4">
                    About
                </div>
                <div className="px-4 py-3 text-right sm:flex md:py-4">
                    Posts
                </div>
                <div className="px-4 py-3 text-right sm:flex md:py-4">
                    Resume
                </div>
            </div>
            <div className="hidden px-4 py-3 sm:flex md:py-4">About</div>
            <div className="hidden px-4 py-3 sm:flex md:py-4">Posts</div>
            <div className="hidden px-4 py-3 sm:flex md:py-4">Resume</div>
            <button
                className="z-50 flex flex-col px-4 py-3 sm:hidden"
                onClick={handleOpen}
            >
                <span
                    className={`m-0.75 block h-1 w-7 origin-top-left rounded-xs bg-black dark:bg-white ${isOpen ? 'translate-x-1/5 translate-y-1/5 rotate-45 duration-300' : 'duration-300'}`}
                ></span>
                <span
                    className={`m-0.75 block h-1 w-7 rounded-xs ${isOpen ? 'invisible duration-300' : 'bg-black duration-300 dark:bg-white'}`}
                ></span>
                <span
                    className={`m-0.75 block h-1 w-7 origin-bottom-left rounded-xs bg-black dark:bg-white ${isOpen ? '-translate-y-1/5 translate-x-1/5 -rotate-45 duration-300' : 'duration-300'}`}
                ></span>
            </button>
        </>
    )
}

export default NavBar
