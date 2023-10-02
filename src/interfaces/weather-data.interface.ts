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

export default interface WeatherData {
    current: CurrentWeatherData;
    location: WeatherLocation;
}