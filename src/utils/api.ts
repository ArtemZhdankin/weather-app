import WeatherData, { WeatherLocation } from "../interfaces/weather-data.interface"

export const getCities = async (query: string): Promise<WeatherLocation[]> => {
    const response = await fetch(`http://api.weatherapi.com/v1/search.json?key=8d79f078e4c949bb819215608231810&q=${query}`, {method:'get'})

    if (response.ok) {
        return await response.json() 
    }

    return []
}

export const getWeather = async (query: string, daysAmount: number): Promise<WeatherData | null> => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d79f078e4c949bb819215608231810&q=${query}&days=${daysAmount}&aqi=yes`, {method:'get'})

    if (response.ok) {
        return await response.json() 
    }

    return null
}