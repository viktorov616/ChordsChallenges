import React, { PropTypes } from 'react';

export default function ChordsItem(props) {
  return (
    <li className="chords-item">
      <button
        onClick={props.handleClick}
        className="btn btn--small chords-item__btn"
      >
        { props.chord }
      </button>
    </li>
  );
}

ChordsItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  chord: PropTypes.string.isRequired,
};
