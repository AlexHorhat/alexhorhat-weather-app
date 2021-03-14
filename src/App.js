import './sass/App.scss';
import Main from './components/Main'
import { useState } from 'react'

function App() {
  const api = {
    key: "3a4015c59fc01878434227ba79fd42ca",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState('');
  const [instances, setInstance] = useState([]);
  const [error, setError] = useState('');

  const search = (e) => {
    if (instances.length >= 5) {
      errorTooManyLocations();
      return;
    }
    fetchData();
    setQuery('');
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
      setInstance([...instances, data]);
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


  const deleteInstance = (id) => {
    setInstance(instances.filter((instance) => instance.id !== id))
  }

  return (
    <div className="App">
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
      {(typeof instances != "undefined") && (
        <Main
          instances={instances}
          onDelete={deleteInstance}
        />
      )}
    </div>
  );
}

export default App;
