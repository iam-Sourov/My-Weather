import { IoLocationSharp } from "react-icons/io5";
import { FaCloudRain, FaThermometer, FaWind } from "react-icons/fa";
import { LuDroplets } from "react-icons/lu";
import { formatDateFromUnix, capitalize } from "../utils/format";

const DetailRow = ({ label, value }) => (
    <div className="flex justify-between items-center border-b border-white/5 pb-1 last:border-b-0">
        <div className="font-light">{label}</div>
        <div className="font-semibold text-white">{value}</div>
    </div>
);
export default function CurrentWeather({ weather }) {
    console.log(weather);
    
    if (!weather) return null;
    const { location, current } = weather;
    
    const desc = capitalize(current.condition.text);
    const temp = Math.round(current.temp_c);
    const feels = Math.round(current.feelslike_c);
    const humidity = current.humidity;
    const wind = current.wind_kph;
    const rain = current.precip_mm || 0;
    const icon = `https:${current.condition.icon}`;
    const dateStr = formatDateFromUnix(location.localtime_epoch);
    const tempMin = temp - 2;
    const tempMax = temp + 2;

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:items-start p-4 mt-5">
            <div className="col-span-2 weather-card p-8 relative min-h-[400px] flex flex-col justify-center items-center md:items-start">
                <div className="text-sm flex items-center text-slate-300">
                    <IoLocationSharp size={16} className="mr-1" />
                    {location.name}, {location.country} • {dateStr}
                </div>

                <div className="mt-6 text-7xl font-extrabold">{temp}°C</div>
                <div className="mt-3 text-2xl opacity-80 capitalize">{desc}</div>

                <img
                    src={icon}
                    alt={desc}
                    className="absolute top-0 md:right-6 md:top-6 w-36 h-36 opacity-80"
                />
                <div className="absolute inset-x-6 bottom-6 border-t border-white/10 pt-4 w-auto flex flex-wrap gap-6 text-sm text-slate-300">
                    <div className="flex items-center gap-1">
                        <FaThermometer size={16} /> Feels like{" "}
                        <span className="font-semibold text-white">{feels}°C</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <LuDroplets size={16} /> Humidity{" "}
                        <span className="font-semibold text-white">{humidity}%</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaWind size={16} /> Wind{" "}
                        <span className="font-semibold text-white">{wind} km/h</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <FaCloudRain size={16} /> Precip{" "}
                        <span className="font-semibold text-white">{rain} mm</span>
                    </div>
                </div>
            </div>

            <div className="weather-card p-6 flex flex-col justify-center md:justify-between">
                <div>
                    <div className="text-4xl font-bold text-right">{temp}°C</div>
                    <div className="text-sm text-slate-300 mt-1 text-right">{desc}</div>
                </div>

                <div className="mt-6">
                    <h4 className="text-xl text-slate-300 mb-3">Today's Summary</h4>
                    <div className="flex flex-col gap-3 text-sm text-slate-300">
                        <DetailRow label="Min Temp" value={`${tempMin}°C`} />
                        <DetailRow label="Max Temp" value={`${tempMax}°C`} />
                        <DetailRow label="Feels Like" value={`${feels}°C`} />
                        <DetailRow label="Humidity" value={`${humidity}%`} />
                        <DetailRow label="Wind Speed" value={`${wind} km/h`} />
                        <DetailRow label="Precipitation" value={`${rain} mm`} />
                    </div>
                </div>
            </div>
        </div>
    );
}
