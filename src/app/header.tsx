'use client'
import NavBar from '@/components/NavBar'
import React from 'react'

const Header = () => {
    return (
        <header className="flex flex-row-reverse text-4xl sm:flex-row md:text-2xl">
            <NavBar />
        </header>
    )
}

export default Header
