import React from 'react'
import { WeatherLocation } from '../../interfaces/weather-data.interface'
import './Header.css'

type HeaderProps = {
    location: WeatherLocation
}

const Header: React.FC<HeaderProps> = ({ location }) => {
    return <h3 className='header'>Weather in {location.name}, {location.region}, {location.country}</h3>
}

export default Header

// Заголовок, локация для которой отображается погода