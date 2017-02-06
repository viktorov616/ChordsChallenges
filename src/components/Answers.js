import React, { PropTypes } from 'react';

export default function Answers(props) {
  const basicCurrentAnswerClass = 'answers__current-answer';
  const currentAnswerClass = (props.lastAnswer)
    ? `${basicCurrentAnswerClass} ${basicCurrentAnswerClass}--correct`
    : `${basicCurrentAnswerClass} ${basicCurrentAnswerClass}--wrong`;
  let currentAnswerText;

  if (props.lastAnswer === true) {
    currentAnswerText = 'Correct!';
  } else if (props.lastAnswer === false) {
    currentAnswerText = 'Wrong!';
  } else {
    currentAnswerText = '';
  }

  console.log(props.lastAnswer);

  return (
    <div className="answers">
      <div className="answers__items">
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

          return (
            <div
              key={answer.id}
              className={currentClass}
            />
          );
        }) }
      </div>
      <div className={currentAnswerClass}>{ currentAnswerText }</div>
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
