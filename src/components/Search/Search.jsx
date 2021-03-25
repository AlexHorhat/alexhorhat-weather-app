import React from 'react'
import DarkMode from '../DarkTheme/DarkMode'
import { useState } from 'react'
import { BiSearch } from 'react-icons/bi';

const Search = ({api, getInstance, instances}) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
  
    class Location {
      constructor(response){
        this.id = response.id;
        this.location = `${response.name}, ${response.sys.country} `;
        this.temp = Math.round(response.main.temp);
        this.weather = response.weather[0].main;
        this.min = Math.round(response.main.temp_min);
        this.max = Math.round(response.main.temp_max);
        this.icon = response.weather[0].icon;
      }
    }

    const search = async (e) => {
      if (instances.length >= 5) {
        errorTooManyLocations();
        return;
      }
      const data = await fetchData();
      setQuery('');
      if (data === undefined){
        return;
      }
      let location = new Location(data);
      getInstance(location);
    }
    
    const fetchData = async () => {
      const res = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
      const data = await res.json()
  
      if (data.cod === "404") {
        errorLocationNotFound();
        return;
      }
      let check = true;
      instances.map((instance) => {
        if (instance.id === data.id) {
          errorLocationAlreadyExists();
          check = false;
        }
      })
      if (check === true){
        return data;
      }
    }
    
    const errorLocationNotFound = () => {
      setQuery('');
      setError(
        <div className="error"><p>{query} was not found.</p> <p>Please enter another location or check for typos.</p></div>)
        setTimeout(() => setError(''), 3000);
    };
  
    const errorLocationAlreadyExists = () => {
      setQuery('');
      setError(
        <div className="error"><p>{query} is already a location.</p></div>)
      setTimeout(() => setError(''), 3000);
    };
  
    const errorTooManyLocations = () => {
      setQuery('');
      setError(
        <div className="error">Too many locations. Please delete one.</div>)
      setTimeout(() => setError(''), 3000);
    };


    return (
        <header className="search-container">
          <div className="search-bar">
            <input
                className="input"
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={(e) => { if (e.key === "Enter" && query !== '') { search(e) } }}
                type="text"
                placeholder="Search for a location..."
                />
            <button
              className="submit" 
              value={query}
              onClick={(e) => { if (query !== '') search(e)}}
              ><BiSearch /></button>
          </div>
              <DarkMode></DarkMode>
            {error}
        </header>
    )
}

export default Search
