import React, { PropTypes } from 'react';

import ChordsList from './ChordsList';
import Btn from './Btn';

export default function CluePopup(props) {
  function handlePlayChordSound(e) {
    const chord = e.target.textContent;

    props.playChordSound(chord);
  }

  return (
    <div id={props.id} className="clue-popup">
      <div className="clue-popup__control">
        <Btn
          handleClick={props.toggleCluePopup}
          text={'Hide'}
        />
      </div>
      <ChordsList
        chords={props.chords}
        handleClick={handlePlayChordSound}
      />
    </div>
  );
}

CluePopup.propTypes = {
  chords: PropTypes.array.isRequired,
  id: PropTypes.string,
  playChordSound: PropTypes.func.isRequired,
  toggleCluePopup: PropTypes.func.isRequired,
};

CluePopup.defaultProps = {
  id: '',
};
