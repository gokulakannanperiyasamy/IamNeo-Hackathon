// Rating.js
import React from 'react';
import './Rating.css'; // Create a separate CSS for styling

const Rating = ({ rating, setRating }) => {
  const handleClick = (rate) => {
    setRating(rate);
  };

  return (
    <div className="rating">
      {[1, 2, 3, 4, 5].map((rate) => (
        <span
          key={rate}
          className={`star ${rate <= rating ? 'selected' : ''}`}
          onClick={() => handleClick(rate)}
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default Rating;
