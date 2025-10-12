import React from 'react'
import { FaCloudSun } from 'react-icons/fa'


export default function Navbar() {
    return (
        <nav className="w-full p-2 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-white/6 rounded-lg weather-card flex items-center gap-2">
                    <FaCloudSun className="text-2xl" />
                    <span className="font-semibold">WeatherUI</span>
                </div>
                
            </div>
        </nav>
    )
}