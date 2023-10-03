import React, { useEffect, useState } from 'react';
import WeatherData, { WeatherForecastSummary } from './interfaces/weather-data.interface';
import './App.css'
import {format} from 'date-fns'
import classNames from 'classnames';
import { Button } from 'react-bootstrap';


const App = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [activeDay, setActiveDay] = useState<WeatherForecastSummary | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')

  const dayProperties = [
    {title: 'Temperature, C', key: 'temp_c'},
    {title: 'Wind, Kph', key: 'wind_kph'},
    {title: 'Chance of rain, %', key: 'chance_of_rain'},
    {title: 'Feels like, C', key: 'feelslike_c'},
    {title: 'Wind direction', key: 'wind_dir'},
    {title: 'Dewpoint, C', key: 'dewpoint_c'},
    {title: 'UV Index', key: 'uv'}
  ]

  const fetchData = async (query: string) => {
    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=f9ba2df78d6841d7b25214748230210&q=${query}&days=7&aqi=yes`, {method:'get'})
  
    if (response.ok) {
      const data = await response.json() as WeatherData
      console.log(data)

      setWeatherData(data)
      setActiveDay(data.forecast.forecastday[0])
    }
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      const lat = position.coords.latitude
      const lon = position.coords.longitude

      fetchData(`${lat},${lon}`)
        
    });
  }, [])
  
  return (
    <div className="App">
      <a className='logo' href="https://www.weatherapi.com/" title="Free Weather API">
        <img src='//cdn.weatherapi.com/v4/images/weatherapi_logo.png' alt="Weather data by WeatherAPI.com" />
      </a>

      <div className='header__search'>
        <input placeholder='City name..' value={searchValue} onChange={(e) => { setSearchValue(e.target.value)} } type='text' />
        <Button variant='primary' onClick={() => fetchData(searchValue)}>Search</Button>
      </div>

      <h3 className='header'>Weather in {weatherData?.location.name}, {weatherData?.location.region}, {weatherData?.location.country}</h3>

      <div>
        <img width={64} height={64} src={weatherData?.current.condition.icon} /> 
        <b>{weatherData?.current.condition.text}</b>&nbsp;|
        Temperature: <b>{weatherData?.current.temp_c} C</b>&nbsp;|
        Wind: <b>{weatherData?.current.wind_mph} {weatherData?.current.wind_dir}</b>&nbsp;|
        Pressure: <b>{weatherData?.current.pressure_mb} Mb</b>&nbsp;|
        Feels like: <b>{weatherData?.current.feelslike_c} C</b>
      </div>

      <div className='forecast'>
        {weatherData?.forecast.forecastday.map((forecastDay, index) => {
            return <div className={classNames('forecast__day', { 'forecast__day--active': forecastDay === activeDay })} key={index} onClick={() => setActiveDay(forecastDay)}>
              <b className='forecast__day-title'>{format(new Date(forecastDay.date + ' 12:00:00'), 'MMM, do')}</b><br/>
              <span>{format(new Date(forecastDay.date + ' 12:00:00'), 'EEEE')}</span><br/>
              <img width={64} height={64} src={forecastDay.day.condition.icon} /> <br/>
              <div className='forecast__day-desc'>{forecastDay.day.condition.text}</div>
              <div><span className='forecast__day-min'>{forecastDay.day.mintemp_c}C</span> ... <span className='forecast__day-max'>{forecastDay.day.maxtemp_c}C</span></div>
            </div>
          })
        }
      </div>

      <div className='forecast-details'>
        <table>
          <thead>
            <tr>
              <th></th>
              {activeDay?.hour.map((hour, index) => {
                return <th key={index}>{format(new Date(hour.time), 'hhaaa')}</th>
              })}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td></td>
              {activeDay?.hour.map((hour, index) => {
                  return <td key={index}><img width={32} height={32} src={hour.condition.icon} /> </td>
                })}
            </tr>

            {dayProperties.map((prop, index) => {
              return <tr key={index}>
                      <td><b>{prop.title}</b></td>
                      {activeDay?.hour.map((hour, index) => {
                          return <td key={index}>{(hour as Record<string, any>)[prop.key]}</td>
                        })}
                    </tr>
            })}
          </tbody>
        </table>

        
      </div>
    </div>
  );
}

export default App;
