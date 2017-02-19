import React, { PropTypes } from 'react';

import ChallengesListHeader from './ChallengesListHeader';

export default function ChallengesList(props) {
  const Item = props.item;
  return (
    <ul className="challenges-list">
      <ChallengesListHeader />
      { props.challenges.map(challenge => <Item
        key={challenge.id}
        {...challenge}
        {...props}
      />) }
    </ul>
  );
}

ChallengesList.propTypes = {
  challenges: PropTypes.array.isRequired,
  item: PropTypes.func.isRequired,
};
