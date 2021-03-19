import React from "react";
import Card from "./Card";
import Carousel from "react-elastic-carousel";
import { useState } from 'react';

const Main = ({ instances, onDelete }) => {
    const [state, setState] = useState('');

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  const breakPoints = [
      {width: 1, itemsToShow: 1 },
      {width: 550, itemsToShow: 2 },
      {width: 768, itemsToShow: 3 },
      {width: 1200, itemsToShow: 5 },
  ]

  const reRender = () => {
    setState('');
  }

  return (
    <main className="main-container">
      <Carousel onChange={reRender} breakPoints={breakPoints}>
        {instances.map((instance) => (
          <Card
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
        <div>{state}</div>
      </Carousel>
    </main>
  );
};

export default Main;
