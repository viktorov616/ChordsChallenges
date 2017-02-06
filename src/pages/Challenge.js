import React, { PropTypes } from 'react';

import Answers from '../components/Answers';

export default function Challenge(props) {
  return (
    <div className="challenge">
      <Answers
        answers={props.challenge.answers}
        lastAnswer={props.challenge.lastAnswer}
        stage={props.challenge.stage}
      />
    </div>
  );
}

Challenge.propTypes = {
  challenge: PropTypes.shape({
    answers: PropTypes.array.isRequired,
    stage: PropTypes.number.isRequired,
    lastAnswer(props, propName, componentName) {
      const prop = props[propName];

      if (prop !== null && typeof props !== 'string') {
        return new Error(`Invalid prop '${propName}' supplied to ${componentName}. Validation failed.`);
      }

      return null;
    },
  }).isRequired,
};
