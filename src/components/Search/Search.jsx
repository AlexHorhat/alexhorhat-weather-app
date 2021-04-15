import "./Search.scss";
import React from 'react';
import DarkMode from '../DarkTheme/DarkMode';
import { useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import Location from '../CustomHooks/Location';
import Update from '../CustomHooks/Update';
// import fetchData from '../CustomHooks/fetchData';


const Search = ({api, getInstance, instances, setInstance}) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const search = async () => {
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
      instances.forEach((instance) => {
        if (instance.id === data.id) {
          errorLocationAlreadyExists();
          check = false;
        }
      })
      if (check === true){
        return data;
      }
    }

    const checkInstances = (instances) => {
      instances.forEach( async (instance) => {
        const now = Date();
        const instanceAge = Math.round((Date.parse(now) - Date.parse(instance.time)) / (1000*60));
        const tooOld = instanceAge >= 15;
        
        if(tooOld){
          console.log(instance);
          const update = await getInstanceUpdate(instance);
          updateInstance(update, instances);
          console.log(update);
        }
      })
    };
    
    const updateInstance = (update, instances) => {
      instances.forEach( (instance) => {
        if (update.id === instance.id) {
          instance.location = update.location;
          instance.temp = update.temp;
          instance.weather = update.weather;
          instance.max = update.max;
          instance.min = update.min;
          instance.icon = update.icon;
          instance.time = new Date();
        }
      })
      localStorage.setItem("instances", JSON.stringify(instances));
    }

    const getInstanceUpdate = async (instance) => {
      const data = await fetchUpdate(instance);
      const update = new Update(data);

      return update;

    };
    
    const fetchUpdate = async (instance) => {
      const res = await fetch(`${api.base}weather?q=${instance.location}&units=metric&appid=${api.key}`);
      const data = await res.json();

      return data;
    }

    useEffect(() => {
      setInterval(() => checkInstances(instances), 1000000);
    },[])


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
