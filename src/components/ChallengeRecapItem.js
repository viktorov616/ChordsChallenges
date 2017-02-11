import React, { PropTypes } from 'react';

export default function ChallengeRecapItem(props) {
  const answerText = (props.answer) ? 'Correct' : 'Wrong';
  const answerDefaultClass = 'challenge-recap-item__answer';
  const answerClass = (props.answer)
    ? `${answerDefaultClass} ${answerDefaultClass}--correct`
    : `${answerDefaultClass} ${answerDefaultClass}--wrong`;
  return (
    <li className="challenge-recap-item">
      <span className="challenge-recap-item__stage">{ props.stage + 1 }</span>
      <span className="challenge-recap-item__chord">{ props.chord }</span>
      <span className={answerClass}>{ answerText }</span>
    </li>
  );
}

ChallengeRecapItem.propTypes = {
  answer: PropTypes.bool.isRequired,
  chord: PropTypes.string.isRequired,
  stage: PropTypes.number.isRequired,
};
