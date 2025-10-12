import React, { useEffect, useState, useCallback } from 'react'
import SearchBar from '../components/SearchBar'
import CurrentWeather from '../components/CurrentWeather'
import Forecast from '../components/Forecast'
import Spinner from '../components/Spinner'
import { getCoords, getWeatherByCoords, get7DayForecast } from '../services/weatherService'

export default function Home() {
    const [city, setCity] = useState('')
    const [weatherData, setWeatherData] = useState(null)
    const [forecastData, setForecastData] = useState([])
    const [loading, setLoading] = useState(false)

    const fetchWeather = useCallback(async (input) => {
        try {
            setLoading(true)
            setWeatherData(null)
            setForecastData([])

            let coords
            if (typeof input === 'object' && input.lat && input.lon) {
                coords = input
            } else {
                coords = await getCoords(input)
                if (!coords) throw new Error('City not found')
            }

            const [weather, forecast] = await Promise.all([
                getWeatherByCoords(coords.lat, coords.lon),
                get7DayForecast(coords.lat, coords.lon),
            ])

            setCity(`${coords.name}, ${coords.country}`)
            setWeatherData(weather)
            setForecastData(forecast)
        } catch (err) {
            console.error(err)
            alert(err.message)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (!navigator.geolocation) {
            fetchWeather('Dhaka,BD')
            return
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const { latitude, longitude } = pos.coords
                fetchWeather({ lat: latitude, lon: longitude })
            },
            () => fetchWeather('Dhaka,BD'),
            { enableHighAccuracy: true, timeout: 5000 }
        )
    }, [fetchWeather])

    return (
        <div className="max-w-7xl mx-auto px-4 pb-8">
            <SearchBar onSearch={fetchWeather} loading={loading} />
            {loading && <Spinner />}
            {weatherData && (
                <>
                    <CurrentWeather city={city} weather={weatherData} />
                    <Forecast forecastData={forecastData} />
                </>
            )}
        </div>
    )
}
