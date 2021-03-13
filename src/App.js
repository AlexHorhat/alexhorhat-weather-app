import './sass/App.scss';
import Main from './components/Main'
import { useState } from 'react'

function App() {
  const api = {
    key: "3a4015c59fc01878434227ba79fd42ca",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});
  const [instances, setInstance] = useState([]);
  const [error, setError] = useState('');

  const search = (e) => {
    if (e.key === "Enter") {
      const fetchData = async () => {
        const res = await fetch(`${api.base}weather?q=${query}&units=metric&appid=${api.key}`)
        const data = await res.json()
        
        if  (data.cod === "404"){
          setError(
          <div className="error"><p>{query} was not found.</p> <p>Please enter another location or check for typos.</p></div>)
          console.log("City not found")

          setTimeout(() => setError(''), 3000);
        }else{
          setQuery('');
          setWeather(data);
          setInstance([...instances, data]);
        }
      }
      fetchData();
    }
  }

  const deleteInstance = (id) => {
    setInstance(instances.filter((instance) => instance.id !== id ))
  }

  return (
    <div className="App">
      <header className="header-container">
        <input
          onChange={e => setQuery(e.target.value)}
          value={query}
          onKeyPress={search}
          type="text"
          placeholder="Search for a city..."
        />
        {error}
      </header>
      {(typeof weather.main != "undefined") ? (
      <Main  
        instances={instances}
        onDelete={deleteInstance}
      />
      ) : ('')}
    </div>
  );
}

export default App;
