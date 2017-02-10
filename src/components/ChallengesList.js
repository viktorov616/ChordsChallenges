import React, { PropTypes } from 'react';

import ChallengesItem from './ChallengesItem';

export default function ChallengesList(props) {
  return (
    <ul className="challenges-list">
      <li className="challenges-list__item-header">
        <span className="challenges-list__item-stage">Stage</span>
        <span className="challenges-list__item-type">Type</span>
        <span className="challenges-list__item-chords">Chords</span>
      </li>
      { props.challenges.map(challenge => <ChallengesItem
        key={challenge.id}
        {...challenge}
      />) }
    </ul>
  );
}

ChallengesList.propTypes = {
  challenges: PropTypes.array.isRequired,
};
