const KEY = import.meta.env.VITE_OPENWEATHER_API_KEY

// Get city coordinates
export async function getCoords(cityName) {
    const q = encodeURIComponent(cityName)
    const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${q}&limit=1&appid=${KEY}`
    )

    if (!res.ok) throw new Error('Failed to fetch city coordinates')

    const data = await res.json()
    return data[0]
        ? {
            lat: data[0].lat,
            lon: data[0].lon,
            name: data[0].name,
            country: data[0].country,
        }
        : null
}

// ✅ Only fetch current weather (works with free plan)
export async function getWeatherByCoords(lat, lon) {
    const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`
    )

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.message || `Weather fetch failed: ${res.status}`)
    }

    return res.json()
}
