import { IoLocationSharp } from "react-icons/io5";
import { formatDateFromUnix, capitalize } from '../utils/format'
import { FaCloudRain, FaThermometer, FaWind } from "react-icons/fa";
import { LuDroplets } from "react-icons/lu";


const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-white/5 pb-1 last:border-b-0">
        <div className="font-light">{label}</div>
        <div className="font-semibold text-white">{value}</div>
    </div>
);
export default function CurrentWeather({ city, weather }) {
    if (!weather) return null
    const main = weather.weather?.[0]
    const desc = capitalize(main?.description)
    const temp = Math.round(weather.main?.temp)
    const feels = Math.round(weather.main?.feels_like)
    const humidity = weather.main?.humidity
    const wind = weather.wind?.speed ?? 0
    const rain = weather.rain?.['1h'] ?? 0
    const tempMin = Math.round(weather.main?.temp_min)
    const tempMax = Math.round(weather.main?.temp_max)

    const dateStr = formatDateFromUnix(weather.dt)
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start p-4 mt-5">
            <div className="col-span-2 weather-card p-8 relative min-h-[400px] flex flex-col justify-center items-center md:items-start">
                <div className="text-sm flex items-center text-slate-300">
                    <IoLocationSharp size={16} className="mr-1" />
                    {city} • {dateStr}
                </div>
                <div className="mt-6 text-7xl font-extrabold">
                    {temp}°C
                </div>
                <div className="mt-3 text-2xl opacity-80 capitalize">
                    {desc}
                </div>
                <img
                    src={`https://openweathermap.org/img/wn/${main?.icon}@4x.png`}
                    alt={desc}
                    className="absolute top-0 md:right-6 md:top-6 w-36 h-36 opacity-80" />
                <div className="absolute inset-x-6 bottom-6 border-t border-white/10 pt-4 w-auto flex flex-wrap gap-6 text-sm text-slate-300">
                    <div className="flex items-center gap-1">
                        <FaThermometer size={16} /> Feels like <span className="font-semibold text-white">{feels}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LuDroplets size={16} /> Humidity <span className="font-semibold text-white">{humidity}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaWind size={16} /> Wind <span className="font-semibold text-white">{wind} m/s</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaCloudRain size={16} /> Precip <span className="font-semibold text-white">{rain} mm</span>
                    </div>
                </div>
            </div>
            <div className="weather-card p-6 flex flex-col justify-center md:justify-between">
                <div>
                    <div className="text-4xl font-bold text-right">{temp}°C</div>
                    <div className="text-sm text-slate-300 mt-1 text-right">
                        {desc}
                    </div>
                </div>
                <div className="mt-6">
                    <h4 className="text-xl text-slate-300 mb-3">
                        Today's Summary
                    </h4>
                    <div className="flex flex-col gap-3 text-sm text-slate-300">
                        <DetailRow label="Min Temp" value={`${tempMin}°C`} />
                        <DetailRow label="Max Temp" value={`${tempMax}°C`} />
                        <DetailRow label="Feels Like" value={`${feels}°C`} />
                        <DetailRow label="Humidity" value={`${humidity}%`} />
                        <DetailRow label="Wind Speed" value={`${wind} m/s`} />
                        <DetailRow label="Rain (1h)" value={`${rain} mm`} />
                    </div>
                </div>
            </div>
        </div>
    )
}