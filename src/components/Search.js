import React from 'react'
import { useState } from 'react'

const Search = ({api, getInstance, instances}) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');
  
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
      getInstance(data);
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
        <header className="header-container">
            <input
                onChange={e => setQuery(e.target.value)}
                value={query}
                onKeyPress={(e) => { if (e.key === "Enter") { search(e) } }}
                type="text"
                placeholder="Search for a location..."
            />
            {error}
        </header>
    )
}

export default Search
