import './sass/App.scss';
import Main from './components/Main.jsx'
import Search from './components/Search.jsx'
import { useState } from 'react'

// const fake = [{"coord":{"lon":23.7162,"lat":37.9795},"weather":[{"id":802,"main":"Clouds","description":"scattered clouds","icon":"03n"}],"base":"stations","main":{"temp":14.48,"feels_like":12.19,"temp_min":14,"temp_max":15,"pressure":1011,"humidity":58},"visibility":10000,"wind":{"speed":2.06,"deg":160},"clouds":{"all":40},"dt":1616173140,"sys":{"type":1,"id":6613,"country":"GR","sunrise":1616128215,"sunset":1616171733},"timezone":7200,"id":264371,"name":"Athens","cod":200},
// {"coord":{"lon":47,"lat":-20},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"base":"stations","main":{"temp":16.33,"feels_like":16.05,"temp_min":16.33,"temp_max":16.33,"pressure":1014,"humidity":96,"sea_level":1014,"grnd_level":837},"visibility":6974,"wind":{"speed":3.07,"deg":83,"gust":7.21},"rain":{"1h":2.06},"clouds":{"all":100},"dt":1616173405,"sys":{"country":"MG","sunrise":1616122529,"sunset":1616166245},"timezone":10800,"id":1062947,"name":"Madagascar","cod":200}];

function App() {
  const api = {
    key: "3a4015c59fc01878434227ba79fd42ca",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [instances, setInstance] = useState([]);

  const getInstance = (e) => {
    console.log(e);
    setInstance((previousInstances) =>
    {
      return [...previousInstances, e]
    });
  }

  const deleteInstance = (id) => {
    setInstance(instances.filter((instance) => instance.id !== id))
  }

  return (
    <div className="App">
      <Search 
        api={api}
        getInstance={getInstance}
        instances={instances}
        />
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
