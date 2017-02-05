import React, { PropTypes } from 'react';

import ChallengesList from '../components/ChallengesList';

export default function Challenges(props) {
  return (
    <div>
      <ChallengesList challenges={props.challenges} />
    </div>
  );
}

Challenges.propTypes = {
  challenges: PropTypes.object,
};

Challenges.defaultProps = {
  challenges: {},
};
