import React, { useEffect, useState } from 'react';
import WeatherData, { WeatherForecastSummary, WeatherLocation } from './interfaces/weather-data.interface';
import Header from './components/Header/Header';
import HeaderSearch from './components/HeaderSearch/HeaderSearch';
import WeatherSummary from './components/WeatherSummary/WeatherSummary';
import Forecast from './components/Forecast/Forecast';
import ForecastFilter from './components/ForecastFilter/ForecastFilter';
import { DAY_PROPERTIES, DEFAULT_DAY_PROPERTIES } from './utils/constants';
import ForecastDetails from './components/ForecastDetails/ForecastDetails';
import Map from './components/Map/Map'

const App = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [activeDay, setActiveDay] = useState<WeatherForecastSummary | null>(null)
  const [daysAmount, setDaysAmount] = useState(7)

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [locations, setLocations] = useState<WeatherLocation[]>([]);

  const dayProperties = DAY_PROPERTIES
  const [selectedDayProperties, setSelectedDayProperties] = useState(DEFAULT_DAY_PROPERTIES)

  const handleSearch = (query: string) => {
    setIsSearchLoading(true);

    fetch(`http://api.weatherapi.com/v1/search.json?key=8d79f078e4c949bb819215608231810&q=${query}`)
      .then((resp) => resp.json())
      .then((data) => {
        setLocations(data);
        setIsSearchLoading(false);
      });
  };

  const fetchData = async (query: string) => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=8d79f078e4c949bb819215608231810&q=${query}&days=${daysAmount}&aqi=yes`, {method:'get'})
  
    if (response.ok) {
      const data = await response.json() as WeatherData
      setWeatherData(data)
      setActiveDay(data.forecast.forecastday[0])
    }
  }

  useEffect(() => {
    if (!weatherData) return
    fetchData(`${weatherData.location.lat},${weatherData.location.lon}`)
  }, [daysAmount])

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      fetchData(`${position.coords.latitude},${position.coords.longitude}`)
        
    }, (error) => {
      fetchData(`${50.43},${30.52}`)
    });
  }, [])
  
  if (!weatherData) {
    return <div>Loading...</div>
  }

  return (
    <div className="App">
      <HeaderSearch 
        isLoading={isSearchLoading}
        options={locations}
        onSearch={handleSearch}
        onChange={fetchData}
      />
      
      <Header location={weatherData?.location} />

      <WeatherSummary
        icon={weatherData?.current.condition.icon} 
        data={weatherData?.current}
        daysAmount={daysAmount}
        onChange={(value) => setDaysAmount(value)}
      />

      <Forecast
        forecastDays={weatherData?.forecast.forecastday}
        activeDay={activeDay} 
        onClick={(forecastDay: WeatherForecastSummary) => setActiveDay(forecastDay)}
      />
   
      <ForecastFilter 
        dayProperties={dayProperties}
        defaultValue={selectedDayProperties}
        onChange={(newValue) => {setSelectedDayProperties(newValue as any)}}
      />

      <ForecastDetails 
        selectedDayProperties={selectedDayProperties}
        activeDay={activeDay}
      />

      { weatherData && <Map location={weatherData.location} /> }
    </div>
  );
}

export default App;
