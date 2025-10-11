import React from 'react'
import { FaCloudSun } from 'react-icons/fa'

export default function Navbar() {
    return (
        <nav className="w-full p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/6 rounded-lg weather-card flex items-center gap-2">
                    <FaCloudSun className="text-2xl" />
                    <span className="font-semibold">WeatherUI</span>
                </div>
                <div className="hidden md:flex gap-4 ml-6 text-sm text-slate-300">
                    <a href="#">Home</a>
                    <a href="#">About</a>
                    <a href="#">Contact</a>
                </div>
            </div>

            <div className="text-slate-400 text-sm">Built with Vite + React + Tailwind</div>
        </nav>
    )
}