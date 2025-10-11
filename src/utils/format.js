export function formatDateFromUnix(unix) {
    return new Date(unix * 1000).toLocaleString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })
}


export function formatHourFromUnix(unix) {
    return new Date(unix * 1000).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}


export function capitalize(s) { return (s || '').replace(/\b\w/g, c => c.toUpperCase()) }