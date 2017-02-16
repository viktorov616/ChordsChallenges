import React, { PropTypes } from 'react';

import GuessItem from './GuessItem';

export default function GuessList(props) {
  return (
    <ul className="guess-list">
      { props.guesses.map(guess => <GuessItem key={guess.id} guess={guess.value} />) }
    </ul>
  );
}

GuessList.propTypes = {
  guesses: PropTypes.array.isRequired,
};
