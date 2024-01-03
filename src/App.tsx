import React, { useEffect, useState } from 'react';
import WeatherData, { WeatherForecastSummary, WeatherLocation } from './interfaces/weather-data.interface';
import './App.css'
import {format} from 'date-fns'
import classNames from 'classnames';

import { MapContainer, useMap } from 'react-leaflet';
import { TileLayer } from 'react-leaflet';
import { Marker } from 'react-leaflet';

import Select from 'react-select'
import Header from './components/Header/Header';
import HeaderSearch from './components/HeaderSearch/HeaderSearch';
import WeatherSummary from './components/WeatherSummary/WeatherSummary';

const RecenterMapAutomatically: React.FC<{lat: number, lon: number}> = ({lat, lon}) => {
  const map = useMap();
   useEffect(() => {
    if (!lat || !lon) return

     map.setView([lat, lon]);
   }, [lat, lon]);
   return null;
}

const App = () => {

  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [activeDay, setActiveDay] = useState<WeatherForecastSummary | null>(null)
  const [daysAmount, setDaysAmount] = useState(7)

  const [isSearchLoading, setIsSearchLoading] = useState(false);
  const [locations, setLocations] = useState<WeatherLocation[]>([]);

  const dayProperties = [
    {label: 'Temperature, C', value: 'temp_c'},
    {label: 'Heat Index, C', value: 'heatindex_c'},
    {label: 'Pressure, MB', value: 'pressure_mb'},
    {label: 'Humidity, %', value: 'humidity'},
    {label: 'Cloud Ceiling', value: 'cloud'},
    {label: 'Visibility, Km', value: 'vis_km'},
    {label: 'Chance of snow, %', value: 'chance_of_snow'},
    {label: 'Chance of rain, %', value: 'chance_of_rain'},
    {label: 'Wind, Kph', value: 'wind_kph'},
    {label: 'Wind Gust, Kph', value: 'gust_kph'},
    {label: 'Feels like, C', value: 'feelslike_c'},
    {label: 'Wind direction', value: 'wind_dir'},
    {label: 'Wind chill, C', value: 'windchill_c'},
    {label: 'Dewpoint, C', value: 'dewpoint_c'},
    {label: 'UV Index', value: 'uv'}
  ]

  const [selectedDayProperties, setSelectedDayProperties] = useState([
    {label: 'Temperature, C', value: 'temp_c'},
    {label: 'Feels like, C', value: 'feelslike_c'},
    {label: 'Pressure, MB', value: 'pressure_mb'},
    {label: 'Humidity, %', value: 'humidity'},
    {label: 'Chance of rain, %', value: 'chance_of_rain'},
    {label: 'Visibility, Km', value: 'vis_km'},
    {label: 'Wind, Kph', value: 'wind_kph'},
    {label: 'Wind direction', value: 'wind_dir'},
    {label: 'UV Index', value: 'uv'}]
  )

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
   
      <>
        <div className='filter-heading'>
          Weather monitoring features
        </div>

        <div className='forecast-filter'>
          <Select
              defaultValue={selectedDayProperties}
              isMulti
              name="colors"
              options={dayProperties as any}
              placeholder="Filter.."
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={(newValue) => {setSelectedDayProperties(newValue as any)}}
            />
        </div>
      </>

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

            {selectedDayProperties.map((prop, index) => {
              return <tr key={index}>
                      <td><b>{prop.label}</b></td>
                      {activeDay?.hour.map((hour, index) => {
                          return <td key={index}>{(hour as Record<string, any>)[prop.value]}</td>
                        })}
                    </tr>
            })}
          </tbody>
        </table>
      </div>

      { weatherData && <div className='map'>
        <MapContainer className='map' center={[weatherData.location.lat, weatherData.location.lon]} zoom={12} scrollWheelZoom={false} >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[weatherData.location.lat, weatherData.location.lon]} />
          <RecenterMapAutomatically lat={weatherData.location.lat} lon={weatherData.location.lon}/>
        </MapContainer>
      </div>}
    </div>
  );
}

export default App;
