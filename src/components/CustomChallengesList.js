import React, { PropTypes } from 'react';

import ChallengesListHeader from './ChallengesListHeader';
import CustomChallengesItem from './CustomChallengesItem';

export default function CustomChallengesList(props) {
  return (
    <ul className="custom-challenges-list">
      <ChallengesListHeader />
      { props.challenges.map(challenge => <CustomChallengesItem
        key={challenge.id}
        {...challenge}
      />) }
    </ul>
  );
}

CustomChallengesList.propTypes = {
  challenges: PropTypes.array.isRequired,
};
