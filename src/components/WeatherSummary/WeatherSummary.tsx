import React from 'react'
import './WeatherSummary.css'
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import { CurrentWeatherData } from '../../interfaces/weather-data.interface';

type WeatherSummaryProps = {
    data: CurrentWeatherData
    icon: string;
    daysAmount: number
    onChange: (value: any) => void
}

const WeatherSummary: React.FC<WeatherSummaryProps> = ({ data, icon, daysAmount, onChange }) => {
    return <div className='weather-summary'>
    <img width={64} height={64} src={icon} /> 
    <b>{data.condition.text}</b>
    <span>| Temperature:</span><b>{data.temp_c} C</b>
    <span>| Wind:</span> <b>{data.wind_mph} {data.wind_dir}</b>
    <span>| Pressure:</span> <b>{data.pressure_mb} Mb</b>
    <span>| Feels like:</span><b>{data.feelslike_c} C</b>

    <div className='day-controls'>
      <ToggleButtonGroup name='days-toggle' type="radio" value={daysAmount} onChange={onChange}>
        <ToggleButton id="tbg-btn-1" value={3}>
          3 days
        </ToggleButton>
        <ToggleButton id="tbg-btn-2" value={5}>
          5 days
        </ToggleButton>
        <ToggleButton id="tbg-btn-3" value={7}>
          7 days
        </ToggleButton>
        <ToggleButton id="tbg-btn-4" value={10}>
          10 days
        </ToggleButton>
        <ToggleButton id="tbg-btn-5" value={14}>
          14 days
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  </div>
}

export default WeatherSummary

// Коротка сводка погоды на текущий день и выбор количества дней прогноза