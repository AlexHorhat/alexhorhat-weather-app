import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';

const Weather = ({city, temp, weather, date, low, high, onDelete, instance}) => {
    return (
        <div className="weather-instance">
            <span className="city">{city}</span>
            <span className="date">{date}</span>
            <span className="temp">{temp}°C</span>
            <span className="weather">{weather}</span>
            <span className="low-high">{low}°C / {high}°C</span>

            <button 
            className="delete"
            onClick={() => onDelete(instance.id)}
            ><RiDeleteBinLine className="delete-icon"/></button>
        </div>
    )
}

export default Weather
