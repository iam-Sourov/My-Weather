import React from 'react'
import { formatDateFromUnix } from '../utils/format'


export default function DailyForecast({ daily = [] }) {
    if (!daily.length) return null
    const days = daily.slice(1, 8) // next 7 days


    return (
        <div className="mt-8">
            <h3 className="text-sm text-slate-300 mb-3">7-Day Forecast</h3>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {days.map((d) => (
                    <div key={d.dt} className="weather-card p-4 flex flex-col items-center">
                        <div className="text-xs text-slate-300 mb-1">{formatDateFromUnix(d.dt)}</div>
                        <img
                            src={`http://openweathermap.org/img/wn/${d.weather?.[0]?.icon}@2x.png`}
                            alt="icon"
                            className="w-14 h-14"
                        />
                        <div className="text-sm text-slate-300 mt-1">{d.weather?.[0]?.main}</div>
                        <div className="mt-2 font-semibold">{Math.round(d.temp.max)}° / {Math.round(d.temp.min)}°C</div>
                    </div>
                ))}
            </div>
        </div>
    )
}