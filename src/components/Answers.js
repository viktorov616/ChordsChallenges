import React, { PropTypes } from 'react';

import checkStringNullPropType from '../utility/checkStringNullPropType';

export default function Answers(props) {
  const basicCurrentAnswerClass = 'answers__current-answer';
  const { lastAnswer } = props;
  let currentAnswerClass;
  let currentAnswerText;

  if (lastAnswer === true) {
    currentAnswerText = 'Correct!';
    currentAnswerClass = `${basicCurrentAnswerClass} ${basicCurrentAnswerClass}--correct`;
  } else if (lastAnswer === false) {
    currentAnswerText = 'Wrong!';
    currentAnswerClass = `${basicCurrentAnswerClass} ${basicCurrentAnswerClass}--wrong`;
  } else {
    currentAnswerText = '';
    currentAnswerClass = basicCurrentAnswerClass;
  }

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
  lastAnswer: checkStringNullPropType,
};

Answers.defaultProps = {
  lastAnswer: null,
};
