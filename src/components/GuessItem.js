import React, { PropTypes } from 'react';

export default function GuessItem(props) {
  return (
    <li className="guess-item">{ props.guess }</li>
  );
}

GuessItem.propTypes = {
  guess: PropTypes.string.isRequired,
};
