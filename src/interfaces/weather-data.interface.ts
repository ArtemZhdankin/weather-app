export interface WeatherCondition {
    icon: string;
    text: string;
}

export interface CurrentWeatherData {
    condition: WeatherCondition;
    temp_c: number;
    temp_f: number;
    wind_mph: number;
    wind_dir: string;
    pressure_mb: number;
    feelslike_c: number;
    feelslike_f: number;
}

export interface WeatherLocation {
    name: string;
    region: string;
    country: string;
}

export interface WeatherForecast {
    forecastday: WeatherForecastSummary[]
}

export interface WeatherForecastSummary {
    date: string
    date_epoch: number;
    day: WeatherForecastDay
    hour: WeatherForecastHour[]
}

export interface WeatherForecastHour {
    time: string
    time_epoch: number;
    condition: WeatherCondition;
    temp_c: number;
    temp_f: number;
    wind_mph: number;
    wind_kph: number;
    wind_degree: number;
    wind_dir: string;
    pressure_mb: number;
    pressure_in: number;
    precip_mm: number;
    precip_in: number;
    humidity: number;
    cloud: number;
    feelslike_c: number;
    feelslike_f: number;
    windchill_c: number;
    windchill_f: number;
    heatindex_c: number;
    heatindex_f: number;
    dewpoint_c: number;
    dewpoint_f: number;
    will_it_rain: number;
    chance_of_rain: number;
    will_it_snow: number;
    chance_of_snow: number;
    vis_km: number;
    vis_miles: number;
    gust_mph: number;
    gust_kph: number;
    uv: number;
}

export interface WeatherForecastDay {
    condition: WeatherCondition
    mintemp_c: number
    mintemp_f: number
    maxtemp_c: number
    maxtemp_f: number 
}

export default interface WeatherData {
    current: CurrentWeatherData;
    location: WeatherLocation;
    forecast: WeatherForecast
}