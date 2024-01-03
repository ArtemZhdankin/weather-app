import React from 'react'
import {format} from 'date-fns'
import { WeatherForecastSummary } from '../../interfaces/weather-data.interface'
import './ForecastDetails.css'

type ForecastDetailsProps = {
    selectedDayProperties: any[]
    activeDay: WeatherForecastSummary | null
}

const ForecastDetails: React.FC<ForecastDetailsProps> = ({ selectedDayProperties, activeDay }) => {
    return <div className='forecast-details'>
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
}

export default ForecastDetails

// Таблица с детальным прогнозом