const KEY = import.meta.env.VITE_WEATHER_API_KEY
const BASE_URL = 'https://api.weatherapi.com/v1'

export async function getCoords(cityName) {
    if (!cityName?.trim()) return null
    const q = encodeURIComponent(cityName.trim())
    const res = await fetch(`${BASE_URL}/search.json?key=${KEY}&q=${q}`)
    if (!res.ok) throw new Error('Failed to fetch city info')

    const data = await res.json()
    const city = data[0]
    if (!city) return null

    return {
        lat: city.lat,
        lon: city.lon,
        name: city.name,
        country: city.country,
    }
}


export async function getWeatherByCoords(lat, lon) {
    const query = lat && lon ? `${lat},${lon}` : ''
    const res = await fetch(`${BASE_URL}/current.json?key=${KEY}&q=${query}&aqi=no`)

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || 'Weather fetch failed')
    }

    return res.json()
}


export async function searchCitySuggestions(query) {
    if (!query?.trim()) return []

    const q = encodeURIComponent(query.trim())
    const res = await fetch(`${BASE_URL}/search.json?key=${KEY}&q=${q}`)
    if (!res.ok) throw new Error('Failed to fetch city suggestions')

    const data = await res.json()
    return data.map((c) => ({
        name: c.name,
        country: c.country,
        lat: c.lat,
        lon: c.lon,
        region: c.region,
    }))
}
export async function get7DayForecast(lat, lon) {
    const query = lat && lon ? `${lat},${lon}` : ''
    const res = await fetch(`${BASE_URL}/forecast.json?key=${KEY}&q=${query}&days=7&aqi=no&alerts=no`)

    if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.error?.message || 'Forecast fetch failed')
    }

    const data = await res.json()
    return data.forecast.forecastday // array of 7 days
}
