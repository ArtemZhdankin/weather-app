import React from "react"
import { AsyncTypeahead } from 'react-bootstrap-typeahead'
import { WeatherLocation } from "../../interfaces/weather-data.interface"
import './HeaderSearch.css'

type HeaderSearchProps = {
    isLoading: boolean
    options: WeatherLocation[]
    onSearch: (query: string) => void
    onChange: (query: string) => void
}

const HeaderSearch: React.FC<HeaderSearchProps> = ({ isLoading, options, onSearch, onChange }) => {

    const onOptionChange = (options: any) => { 
        if (!options.length) return; 
        
        onChange(`${options[0].lat},${options[0].lon}`)
    }

    return <div className='header__search'>
        <AsyncTypeahead
            filterBy={() => true}
            id="location-search"
            isLoading={isLoading}
            labelKey="name"
            minLength={3}
            onSearch={onSearch}
            onChange={onOptionChange}
            options={options}
            placeholder="Enter city name.."
            renderMenuItemChildren={(option: any) => <span>{option.name}, {option.region}, {option.country}</span>}
        />
  </div>
}

export default HeaderSearch