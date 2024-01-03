import React from 'react'
import Select from 'react-select'
import './ForecastFilter.css'

type ForecastFilterProps = {
    dayProperties: any[]
    defaultValue: any
    onChange: (value: any) => void
}

const ForecastFilter: React.FC<ForecastFilterProps> = ({ dayProperties, defaultValue, onChange }) => {
    return <>
        <div className='filter-heading'>
        Weather monitoring features
        </div>

        <div className='forecast-filter'>
        <Select
            defaultValue={defaultValue}
            isMulti
            name="colors"
            options={dayProperties as any}
            placeholder="Filter.."
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={onChange}
            />
        </div>
    </>
}

export default ForecastFilter

// Фильтр для таблицы с детальным прогнозом