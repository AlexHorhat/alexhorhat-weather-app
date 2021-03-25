import "./Card.scss";
import React from 'react'
import { RiDeleteBinLine } from 'react-icons/ri';

const Card = ({onDelete, instance}) => {
    const dateBuilder = (d) => {
        let months = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];
        let days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`;
      };

    return (
        <div className={`weather-instance ${instance.weather.toLowerCase()}`}>
            <span className="weather"> <img src={`./weather/${instance.icon}.png`} alt={instance.weather}/></span>
            <span className="city">{instance.location}</span>
            <span className="date">{dateBuilder(new Date())}</span>
            <span className="temp">{instance.temp}°C</span>
            <span className="low-high">{instance.min}°C / {instance.max}°C</span>

            <button 
            className="delete"
            onClick={() => onDelete(instance.id)}
            ><RiDeleteBinLine className="delete-icon"/></button>
        </div>
    )
}

export default Card
