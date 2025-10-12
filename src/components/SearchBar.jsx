import React, { useState, useEffect } from 'react'
import { FaSearch } from 'react-icons/fa'
import { searchCitySuggestions } from '../services/weatherService'

export default function SearchBar({ onSearch, loading }) {
    const [query, setQuery] = useState('')
    const [suggestions, setSuggestions] = useState([])
    const [isFocused, setIsFocused] = useState(false)

    useEffect(() => {
        if (!query.trim()) {
            setSuggestions([])
            return
        }
        const timer = setTimeout(async () => {
            try {
                const results = await searchCitySuggestions(query)
                setSuggestions(results)
            } catch (err) {
                console.error('Suggestion fetch error:', err)
            }
        }, 400)
        return () => clearTimeout(timer)
    }, [query])

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!query.trim() || loading) return
        onSearch(query.trim())
        setQuery('')
        setSuggestions([])
    }

    const handleSelect = (s) => {
        onSearch(`${s.name}, ${s.country}`)
        setQuery('')
        setSuggestions([])
    }

    return (
        <div className="relative w-full my-4">
            <form onSubmit={handleSubmit} className="flex items-center gap-3">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 150)} // delay to allow click
                    placeholder="Search city, e.g. Dhaka, BD"
                    className="flex-1 p-3 rounded-xl bg-[rgba(255,255,255,0.03)] border border-white/10 outline-none text-white placeholder-white/60"
                    disabled={loading} />
                <button
                    type="submit"
                    aria-label="Search"
                    className={`p-3 rounded-lg weather-card flex items-center justify-center transition-all ${loading ? 'opacity-60 cursor-not-allowed' : 'hover:scale-105'
                        }`}
                    disabled={loading}>
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-t-transparent border-white rounded-full animate-spin" />
                    ) : (
                        <FaSearch />
                    )}
                </button>
            </form>

            {isFocused && suggestions.length > 0 && (
                <ul className="weather-card absolute z-10 mt-2 w-full rounded-xl">
                    {suggestions.map((s, idx) => (
                        <li
                            key={`${s.name}-${idx}`}
                            onMouseDown={() => handleSelect(s)}
                            className="px-4 py-2 hover:bg-white/10 cursor-pointer text-white/90">{s.name}{s.state ? `, ${s.state}` : ''}, {s.country}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
