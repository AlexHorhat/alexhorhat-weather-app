import React from "react";
import Card from "./Card.jsx";
import Carousel from "react-elastic-carousel";

const Main = ({ instances, onDelete }) => {

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
      {width: 1, itemsToShow: 1, itemsToScroll: 1 },
      {width: 550, itemsToShow: 2, itemsToScroll: 1 },
      {width: 768, itemsToShow: 3, itemsToScroll: 1 },
      {width: 1200, itemsToShow: 5, itemsToScroll: 1 },
  ]

  return (
    <main className="main-container">
      {instances.length && <Carousel breakPoints={breakPoints}>
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
      </Carousel>}
    </main>
  );
};

export default Main;
