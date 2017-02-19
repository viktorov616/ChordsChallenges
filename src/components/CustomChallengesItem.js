import React, { PropTypes } from 'react';

export default function CustomChallengesItem(props) {
  function handleDeleteChallenge() {
    props.deleteChallenge(props.id);
  }
  return (
    <li className="custom-challenges-item">
      <span className="custom-challenges-item__stage">{ props.stage }</span>
      <span className="custom-challenges-item__type">{ props.type }</span>
      <span className="custom-challenges-item__chords">{ props.chords.join(', ') }</span>
      <svg
        className="custom-challenges-item__btn-close"
        onClick={handleDeleteChallenge}
      >
        <use xlinkHref="#icon-cross" />
      </svg>
    </li>
  );
}

CustomChallengesItem.propTypes = {
  deleteChallenge: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  stage: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  chords: PropTypes.array.isRequired,
};
