import React from "react";
import Card from "../Card/Card"
import Carousel from "react-elastic-carousel";

const Main = ({ instances, onDelete }) => {

  const breakPoints = [
      {width: 1, itemsToShow: 1, itemsToScroll: 1 },
      {width: 750, itemsToShow: 2, itemsToScroll: 1 },
      {width: 1024, itemsToShow: 3, itemsToScroll: 1 },
      {width: 1200, itemsToShow: 4, itemsToScroll: 1 },
      {width: 1500, itemsToShow: 5, itemsToScroll: 1 },
  ]

  return (
    <main className="main-container">
      {instances.length >0 && <Carousel breakPoints={breakPoints}>
        {instances.map((instance) => (
          <Card
            key={instance.id}
            onDelete={onDelete}
            instance={instance}
          />
        ))}
      </Carousel>}
    </main>
  );
};

export default Main;
