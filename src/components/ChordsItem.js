import React, { PropTypes } from 'react';

import Btn from './Btn';

export default function ChordsItem(props) {
  return (
    <li className="chords-item">
      <Btn
        handleClick={props.handleClick}
        mods={['small']}
        text={props.chord}
      />
    </li>
  );
}

ChordsItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  chord: PropTypes.string.isRequired,
};
