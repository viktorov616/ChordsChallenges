import React, { PropTypes } from 'react';

export default function Answers(props) {
  return (
    <div className="answers">
      { props.answers.map((answer) => {
        const basicClass = 'answers__item';
        let currentClass;

        if (answer.value === null && answer.id === props.stage) {
          currentClass = `${basicClass} ${basicClass}--current`;
        } else if (answer.value === null) {
          currentClass = basicClass;
        } else if (answer.value) {
          currentClass = `${basicClass} ${basicClass}--correct`;
        } else {
          currentClass = `${basicClass} ${basicClass}--wrong`;
        }

        return (<div
          key={answer.id}
          className={currentClass}
        />);
      }) }
    </div>
  );
}

Answers.propTypes = {
  answers: PropTypes.array.isRequired,
  stage: PropTypes.number.isRequired,
  lastAnswer(props, propName, componentName) {
    const prop = props[propName];

    if (prop !== null && typeof props !== 'string') {
      return new Error(`Invalid prop '${propName}' supplied to ${componentName}. Validation failed.`);
    }

    return null;
  },
};

Answers.defaultProps = {
  lastAnswer: null,
};
