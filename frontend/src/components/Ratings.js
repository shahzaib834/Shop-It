import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalf } from '@fortawesome/free-solid-svg-icons';

const Ratings = ({ numReviews, ratings }) => {
  let color = '#f8e825';
  let text = `${numReviews} reviews`;

  return (
    <div>
      <FontAwesomeIcon
        style={{ color }}
        icon={ratings >= 1 ? faStar : ratings >= 0.5 ? faStarHalf : ''}
      />

      <FontAwesomeIcon
        style={{ color }}
        icon={ratings >= 2 ? faStar : ratings >= 1.5 ? faStarHalf : ''}
      />

      <FontAwesomeIcon
        style={{ color }}
        icon={ratings >= 3 ? faStar : ratings >= 2.5 ? faStarHalf : ''}
      />

      <FontAwesomeIcon
        style={{ color }}
        icon={ratings >= 4 ? faStar : ratings >= 3.5 ? faStarHalf : ''}
      />

      <FontAwesomeIcon
        style={{ color }}
        icon={ratings >= 5 ? faStar : ratings >= 4.5 ? faStarHalf : ''}
      />

      <span>{text}</span>
    </div>
  );
};

export default Ratings;
