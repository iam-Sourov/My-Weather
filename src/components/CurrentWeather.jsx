import React from 'react'
import { formatDateFromUnix, capitalize } from '../utils/format'

export default function CurrentWeather({ city, weather }) {
    console.log(city)
    console.log(weather)

    // weather is the OpenWeather /data/2.5/weather response object
    if (!weather) return null

    // main weather description (first item in the weather array)
    const main = weather.weather?.[0]
    const desc = capitalize(main?.description)

    // main temperature data
    const temp = Math.round(weather.main?.temp)
    const feels = Math.round(weather.main?.feels_like)
    const humidity = weather.main?.humidity

    // wind info
    const wind = weather.wind?.speed ?? 0

    // rain (if available)
    const rain = weather.rain?.['1h'] ?? 0

    // min/max for display
    const tempMin = Math.round(weather.main?.temp_min)
    const tempMax = Math.round(weather.main?.temp_max)

    // time formatting
    const dateStr = formatDateFromUnix(weather.dt)

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start mt-6">
            {/* Left / main weather card */}
            <div className="col-span-2 weather-card  p-8 relative min-h-[420px] flex flex-col justify-center items-center md:items-start">
                <div className="text-sm text-slate-300">
                    {city} • {dateStr}
                </div>

                <div className="mt-6  text-7xl font-extrabold">
                    {temp}°C
                </div>

                <div className="mt-3 text-2xl opacity-80 capitalize">
                    {desc}
                </div>

                <img
                    src={`https://openweathermap.org/img/wn/${main?.icon}@4x.png`}
                    alt={desc}
                    className="absolute -top-5 right-50 md:right-6 md:top-6 w-36 h-36 opacity-80"
                />

                <div className="absolute inset-x-6 bottom-6 border-t border-white/10 pt-4 w-auto flex flex-wrap gap-6 text-sm text-slate-300">
                    <div>
                        Feels like{' '}
                        <span className="font-semibold text-white">{feels}°C</span>
                    </div>
                    <div>
                        Humidity{' '}
                        <span className="font-semibold text-white">{humidity}%</span>
                    </div>
                    <div>
                        Wind{' '}
                        <span className="font-semibold text-white">{wind} m/s</span>
                    </div>
                    <div>
                        Precip{' '}
                        <span className="font-semibold text-white">{rain} mm</span>
                    </div>
                </div>
            </div>

            {/* Right panel */}
            <aside className="weather-card p-6 flex flex-col justify-between">
                <div>
                    <div className="text-4xl font-bold text-right">{temp}°C</div>
                    <div className="text-sm text-slate-300 mt-1 text-right">
                        {desc}
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm text-slate-300 mb-3">
                        Today’s Summary
                    </h4>
                    <div className="flex flex-col gap-3 text-sm text-slate-300">
                        <div className="flex justify-between">
                            <div>Min</div>
                            <div className="font-semibold">{tempMin}°C</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Max</div>
                            <div className="font-semibold">{tempMax}°C</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Feels Like</div>
                            <div className="font-semibold">{feels}°C</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Humidity</div>
                            <div className="font-semibold">{humidity}%</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Wind</div>
                            <div className="font-semibold">{wind} m/s</div>
                        </div>
                        <div className="flex justify-between">
                            <div>Rain (1h)</div>
                            <div className="font-semibold">{rain} mm</div>
                        </div>
                    </div>
                </div>
            </aside>
        </div>
    )
}
