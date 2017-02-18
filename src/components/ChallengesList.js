import React, { PropTypes } from 'react';

import ChallengesListHeader from './ChallengesListHeader';
import ChallengesItem from './ChallengesItem';

export default function ChallengesList(props) {
  return (
    <ul className="challenges-list">
      <ChallengesListHeader />
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
