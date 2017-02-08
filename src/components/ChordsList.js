import React, { PropTypes } from 'react';

import ChordsItem from './ChordsItem';

export default function ChordsList(props) {
  return (
    <ul className="chords-list">
      { props.chords.map(chord => <ChordsItem
        key={chord}
        chord={chord}
        handleClick={props.handleClick}
      />) }
    </ul>
  );
}

ChordsList.propTypes = {
  handleClick: PropTypes.func.isRequired,
  chords: PropTypes.array.isRequired,
};
