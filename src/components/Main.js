import React from 'react'
import Weather from './Weather'

const Main = ({instances, onDelete}) => {
    const dateBuilder = (d) => {
        let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
    
        let day = days[d.getDay()];
        let date = d.getDate();
        let month = months[d.getMonth()];
        let year = d.getFullYear();
    
        return `${day} ${date} ${month} ${year}`
      }

    return (
        <main className="main-container">
            {instances.map((instance) => (
                <Weather 
                key={instance.id} 
                city={`${instance.name}, ${instance.sys.country}`} 
                temp={Math.round(instance.main.temp)} 
                weather={instance.weather[0].main} 
                date={dateBuilder(new Date())} 
                low={Math.round(instance.main.temp_min)} 
                high={Math.round(instance.main.temp_max)}
                onDelete={onDelete}
                instance={instance}
                />
            ))}
        </main>
    )
}

export default Main
