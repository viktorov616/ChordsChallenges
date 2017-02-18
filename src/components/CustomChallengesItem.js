import React, { PropTypes } from 'react';

export default function CustomChallengesItem(props) {
  return (
    <li className="custom-challenges-item">
      <span className="challenges-item__stage">{ props.stage }</span>
      <span className="challenges-item__type">{ props.type }</span>
      <span className="challenges-item__chords">{ props.chords.join(', ') }</span>
    </li>
  );
}

CustomChallengesItem.propTypes = {
  id: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  chords: PropTypes.array.isRequired,
};
