import React from 'react'
import {useState} from 'react'

const Header = () => {
    const api = {
        key:"3a4015c59fc01878434227ba79fd42ca",
        base:"https://api.openweathermap.org/data/2.5/"
      }
    const [query, setQuery] = useState('');
    const [weather, setWeather] = useState({});

    const search = (e) => {
        if (e.key === "Enter") {
            fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
            .then(res => res.json())
            .then(result => {
                setQuery('');
                setWeather(result);
            });
        }
    }

    const dateBuilder = (d) => {
        let months =["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();

        return `${day} ${date} ${month} ${year}`
    }

    return (
        <header className="header-container">
            <input
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyPress={search}
            type="text" 
            placeholder="Search for a city..."/>
        </header>
    )
}

export default Header
