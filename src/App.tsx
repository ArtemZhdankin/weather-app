import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import Button from 'react-bootstrap/Button';
import WeatherData from './interfaces/weather-data.interface';


import Card from 'react-bootstrap/Card';

const App = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude
      const lon = position.coords.longitude

      const fetchData = async () => {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f9ba2df78d6841d7b25214748230210&q=${lat},${lon}&days=7`, {method:'get'})
      
        if (response.ok) {
          const data = await response.json()
          console.log(data)

          setWeatherData(data)
        }
      }
      
      fetchData()
        
    });
  }, [])
  
  return (
    <div className="App">
      <h3>Weather in {weatherData?.location.name}, {weatherData?.location.region}, {weatherData?.location.country}</h3>

      <div>
        <img width={64} height={64} src={weatherData?.current.condition.icon} /> 
        Temperature: <b>{weatherData?.current.temp_c} C</b>&nbsp;|
        Wind: <b>{weatherData?.current.wind_mph} {weatherData?.current.wind_dir}</b>&nbsp;|
        Pressure: <b>{weatherData?.current.pressure_mb} Mb</b>&nbsp;|
        Feels like: <b>{weatherData?.current.feelslike_c} C</b>
      </div>
    </div>
  );
}

export default App;
