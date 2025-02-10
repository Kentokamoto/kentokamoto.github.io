'use client'

import Link from 'next/link'
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
                className={`bg-nord4 dark:bg-nord0 absolute top-0 left-0 -z-1 flex h-screen w-screen flex-col place-content-center text-4xl duration-300 ease-in-out ${isOpen ? 'z-20 opacity-100' : '-translate-y-5 opacity-0'}`}
            >
                <div className="px-4 py-3 text-right sm:flex md:py-4">
                    <Link href="/" onClick={handleOpen} replace={true}>
                        About
                    </Link>
                </div>
                <div className="px-4 py-3 text-right sm:flex md:py-4">
                    Resume
                </div>
                <div className="px-4 py-3 text-right sm:flex md:py-4">
                    <a href="/StravaArt" onClick={handleOpen}>
                        Strava Art
                    </a>
                </div>
                <div className="px-4 py-3 text-right sm:flex md:py-4">
                    <a href="https://kentokamoto.github.io/sliceathon/">
                        Slice-a-Thon
                    </a>
                </div>
            </div>
            <div className="hidden px-4 py-3 sm:flex md:py-4">
                <Link href="/" replace={true}>
                    About
                </Link>
            </div>
            <div className="hidden px-4 py-3 sm:flex md:py-4">Resume</div>
            <div className="hidden px-4 py-3 sm:flex md:py-4">
                <a href="/StravaArt">Strava Art</a>
            </div>
            <div className="hidden px-4 py-3 sm:flex md:py-4">
                <a href="https://kentokamoto.github.io/sliceathon/">
                    Slice-a-Thon
                </a>
            </div>
            <button
                className="z-50 flex flex-col px-4 py-3 sm:-z-20 sm:hidden"
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
