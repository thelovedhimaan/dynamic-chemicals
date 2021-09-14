import React from 'react';

const Card = ({ title, children, image }) => {
  return (
    <div className="Card">
      <div className="topSection">
        <div className="cardTitle">{title}</div>
      </div>
      <div className="bottomSection">
        <img className="animeImg" src={image}></img>
        <div className="cardDetails">{children}</div>
      </div>
    </div>
  );
};

export default Card;
