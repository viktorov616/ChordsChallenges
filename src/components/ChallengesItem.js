import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default function ChallengesItem(props) {
  return (
    <li className="challenges-item">
      <Link
        to={`/challenge/${props.id}`}
        className="challenges-item__link"
      >
        <span className="challenges-item__stage">{ props.stage }</span>
        <span className="challenges-item__type">{ props.type }</span>
        <span className="challenges-item__chords">{ props.chords.join(', ') }</span>
      </Link>
    </li>
  );
}

ChallengesItem.propTypes = {
  id: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  chords: PropTypes.array.isRequired,
};
