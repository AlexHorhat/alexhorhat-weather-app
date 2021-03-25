import './App.scss'
import Main from '../Main/Main.jsx'
import Search from '../Search/Search.jsx'
import { useState } from 'react'


function App() {
  const api = {
    key: "3a4015c59fc01878434227ba79fd42ca",
    base: "https://api.openweathermap.org/data/2.5/"
  }

  const [instances, setInstance] = useState([]);

  const getInstance = (response) => {
    console.log(response);
    setInstance((previousInstances) =>
    {
      return [...previousInstances, response]
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
      {(instances !== undefined) && (
        <Main
          instances={instances}
          onDelete={deleteInstance}
        />
      )}
    </div>
  );
}

export default App;
