import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import CurrentWeather from '../components/CurrentWeather'
import Spinner from '../components/Spinner'
import { getCoords, getWeatherByCoords } from '../services/weatherService'


export default function Home() {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [loading, setLoading] = useState(false)

    const fetchWeather = async (fetchData) => {
        try {
            setLoading(true)
            setWeatherData(null) 
            const coords = await getCoords(fetchData)
            if (!coords) throw new Error('City not found')
            const data = await getWeatherByCoords(coords.lat, coords.lon)
            setCity(`${coords.name}, ${coords.country}`)
            setTimeout(() => {
                setWeatherData(data)
                setLoading(false)
            }, 800) 
        } catch (err) {
            alert(err.message)
            console.error(err)
            setLoading(false)
        }
    }
    useEffect(() => { fetchWeather('Dhaka,BD') }, [])

    return (
        <div>
            <div className="max-w-7xl mx-auto">
                <SearchBar onSearch={fetchWeather} loading={loading} />
                {loading && <Spinner></Spinner>}
                {weatherData && (
                    <CurrentWeather city={city} weather={weatherData} />
                )}
            </div>
        </div>
    )
}