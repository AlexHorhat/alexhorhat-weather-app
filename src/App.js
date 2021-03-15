import './sass/App.scss';
import Main from './components/Main'
import Search from './components/Search'
import { useState } from 'react'

function App() {
  const api = {
    key: "3a4015c59fc01878434227ba79fd42ca",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [instances, setInstance] = useState([]);

  const getInstance = (e) => {
    setInstance([...instances, e])
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
