import React, { useState } from 'react'
import { FaSearch } from 'react-icons/fa'

export default function SearchBar({ onSearch, loading }) {
    const [search, setSearch] = useState('')

    const submit = (e) => {
        e.preventDefault()
        if (!search) return
        onSearch(search)
        setSearch('')
    }
    return (
        <form onSubmit={submit} className="w-full flex items-center gap-3 my-4">
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search city, e.g. Dhaka, BD" className="flex-1 p-3 rounded-xl bg-[rgba(255,255,255,0.02)] border border-white/6 outline-none" />
            <button
                className={`p-3 rounded-lg weather-card flex items-center justify-center ${loading ? 'opacity-60 cursor-not-allowed' : ''}`}
                aria-label="Search"
                disabled={loading}>
                {loading ? (

                    <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                    <FaSearch />
                )}
            </button>
        </form>
    )
}