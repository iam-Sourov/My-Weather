import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ onSearch }) {
    const [q, setQ] = useState('')
    const submit = (e) => {
        e.preventDefault()
        if (!q) return
        onSearch(q)
        setQ('')
    }
    return (
        <form onSubmit={submit} className="w-full flex items-center gap-3 my-4">
            <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search city, e.g. Dhaka, BD" className="flex-1 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-white/6 outline-none" />
            <button className="p-3 rounded-xl weather-card" aria-label="Search"><FaSearch /></button>
        </form>
    )
}