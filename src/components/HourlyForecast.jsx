import React from 'react'
import { formatHourFromUnix } from '../utils/format'


export default function HourlyForecast({ hourly = [] }) {
    if (!hourly.length) return null
    const slice = hourly.slice(0, 12)


    return (
        <div className="mt-8">
            <h3 className="text-sm text-slate-300 mb-3">Hourly Forecast</h3>
            <div className="flex gap-3 overflow-x-auto py-2 scrollbar-thin scrollbar-thumb-slate-700">
                {slice.map((h) => (
                    <div key={h.dt} className="hour-card min-w-[90px] flex-shrink-0">
                        <div className="text-xs text-slate-400">{formatHourFromUnix(h.dt)}</div>
                        <img
                            src={`http://openweathermap.org/img/wn/${h.weather?.[0]?.icon}@2x.png`}
                            alt="icon"
                            className="mx-auto w-10 h-10"
                        />
                        <div className="mt-2 font-semibold">{Math.round(h.temp)}°C</div>
                    </div>
                ))}
            </div>
        </div>
    )
}