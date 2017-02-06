import React, { PropTypes } from 'react';

import Answers from '../components/Answers';

export default function Challenge(props) {
  return (
    <div className="challenge">
      <Answers
        answers={props.challenge.answers}
        stage={props.challenge.stage}
      />
    </div>
  );
}

Challenge.propTypes = {
  challenge: PropTypes.shape({
    answers: PropTypes.array.isRequired,
    stage: PropTypes.number.isRequired,
  }).isRequired,
};
