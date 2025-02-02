'use client'
import React from 'react'

interface HeaderProps {
    isOpen: boolean
    onOpen: () => void
}

const Header: React.FC<HeaderProps> = ({ isOpen, onOpen }) => {
    return (
        <header className="flex flex-row-reverse text-4xl sm:flex-row md:text-2xl">
            <div className="hidden px-4 py-3 sm:flex md:py-4">About</div>
            <button
                className="z-50 flex flex-col px-4 py-3 sm:hidden"
                onClick={onOpen}
            >
                <span
                    className={`m-0.75 block h-1 w-7 origin-top-left rounded-xs bg-white ${isOpen ? 'translate-y-1/5 rotate-45 duration-300' : 'duration-300'}`}
                ></span>
                <span
                    className={`m-0.75 block h-1 w-7 rounded-xs ${isOpen ? 'invisible duration-300' : 'bg-white duration-300'}`}
                ></span>
                <span
                    className={`m-0.75 block h-1 w-7 origin-bottom-left rounded-xs bg-white ${isOpen ? '-translate-y-1/5 -rotate-45 duration-300' : 'duration-300'}`}
                ></span>
            </button>
        </header>
    )
}

export default Header
