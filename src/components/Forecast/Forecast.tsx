import React from 'react'
import './Forecast.css'
import {format} from 'date-fns'
import { WeatherForecastSummary } from '../../interfaces/weather-data.interface'
import classNames from 'classnames';

type ForecastProps = {
    forecastDays: WeatherForecastSummary[]
    activeDay: WeatherForecastSummary | null
    onClick: (forecastDay: WeatherForecastSummary) => void
}

const Forecast: React.FC<ForecastProps> = ({ forecastDays, activeDay, onClick }) => {

    return <div className='forecast'>
        {forecastDays.map((forecastDay: WeatherForecastSummary, index: number) => {
            return <div className={classNames('forecast__day', { 'forecast__day--active': forecastDay === activeDay })} key={index} onClick={() => onClick(forecastDay)}>
            <b className='forecast__day-title'>{format(new Date(forecastDay.date + ' 12:00:00'), 'MMM, do')}</b><br/>
            <span>{format(new Date(forecastDay.date + ' 12:00:00'), 'EEEE')}</span><br/>
            <img width={64} height={64} src={forecastDay.day.condition.icon} /> <br/>
            <div className='forecast__day-desc'>{forecastDay.day.condition.text}</div>
            <div><span className='forecast__day-min'>{forecastDay.day.mintemp_c}C</span> ... <span className='forecast__day-max'>{forecastDay.day.maxtemp_c}C</span></div>
            </div>
        })
        }
  </div>
}

export default Forecast

// Компонент для отображения суммарного прогноза погоды по дням (большие кубики)