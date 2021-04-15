import "./App.scss";
import "../Carousel/Carousel.scss";
import Main from "../Main/Main.jsx";
import Search from "../Search/Search.jsx";
import { useState, useEffect } from "react";

function App() {
  const api = {
    key: "3a4015c59fc01878434227ba79fd42ca",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const localInstances = localStorage.getItem("instances");
  
  const returnState = (localInstances) => {
    if (JSON.parse(localInstances) === null){
      return [];
    }
    return JSON.parse(localInstances);
  }
  
  const [instances, setInstance] = useState(returnState(localInstances));
  

  const getInstance = (response) => {
    setInstance((previousInstances) => {
      return [...previousInstances, response];
    });
  };

  useEffect(() => {localStorage.setItem("instances", JSON.stringify(instances));
  }, [instances]);

  const deleteInstance = (id) => {
    setInstance(instances.filter((instance) => instance.id !== id));
  };

  return (
    <div className="App">
      <Search api={api} getInstance={getInstance} instances={instances} setInstance={setInstance} />
      {instances !== undefined && (
        <Main instances={instances} onDelete={deleteInstance} />
      )}
    </div>
  );
}

export default App;
