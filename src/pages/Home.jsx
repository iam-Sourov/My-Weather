import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import SearchBar from '../components/SearchBar'
import CurrentWeather from '../components/CurrentWeather'
import { getCoords, getWeatherByCoords } from '../services/weatherService'
import BG from '../assets/weather.jpg'

export default function Home() {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchWeather = async (q) => {
        try {
            setLoading(true)
            const coords = await getCoords(q)
            if (!coords) throw new Error('City not found')
            const data = await getWeatherByCoords(coords.lat, coords.lon)
            setCity(`${coords.name}, ${coords.country}`)
            setWeatherData(data)
        } catch (err) {
            alert(err.message)
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => { fetchWeather('Dhaka,BD') }, [])

    return (
        <div className={`min-h-screen bg-[url('https://myradar.com/static/background-a089d87ba11e1a4c45a8efa960b86092.jpg')] bg-cover bg-center p-6`}>
            <div className="max-w-7xl mx-auto">
                <Navbar />
                <SearchBar onSearch={fetchWeather} />
                {loading && <div className="text-slate-300">Loading...</div>}
                {weatherData && (
                    <CurrentWeather city={city} weather={weatherData} />
                )}
            </div>
        </div>
    )
}
