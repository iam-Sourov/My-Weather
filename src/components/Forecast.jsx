export default function Forecast({ forecastData }) {
    if (!forecastData?.length) return null

    return (
        <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4 text-white/90">7-Day Forecast</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
                {forecastData.map((day, idx) => (
                    <div key={idx}
                        className="weather-card rounded-2xl p-4 text-center 
                                   ">
                        <div className="text-white/70 text-sm">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}</div>
                        <img src={day.day.condition.icon} alt={day.day.condition.text} className="mx-auto my-2 w-12 h-12" />
                        <div className="text-white/90 text-sm capitalize">{day.day.condition.text}</div>
                        <div className="mt-2 text-white text-base">
                            {Math.round(day.day.maxtemp_c)}° /{' '}
                            <span className="text-white/60">{Math.round(day.day.mintemp_c)}°</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
