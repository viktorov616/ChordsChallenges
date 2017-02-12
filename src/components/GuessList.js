import React, { PropTypes } from 'react';

import GuessItem from './GuessItem';

export default function GuessList(props) {
  return (
    <ul className="guess-list">
      { props.guesses.map(guess => <GuessItem guess={guess} />) }
    </ul>
  );
}

GuessList.propTypes = {
  guesses: PropTypes.array.isRequired,
};
