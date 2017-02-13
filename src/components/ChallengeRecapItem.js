import React, { PropTypes } from 'react';

export default function ChallengeRecapItem(props) {
  const answerText = (props.answer) ? 'Correct' : 'Wrong';
  const answerDefaultClass = 'challenge-recap-item__answer';
  const answerClass = (props.answer)
    ? `${answerDefaultClass} ${answerDefaultClass}--correct`
    : `${answerDefaultClass} ${answerDefaultClass}--wrong`;
  const stage = props.stage + 1;
  const chords = props.chords.join(', ');

  return (
    <li className="challenge-recap-item">
      <span className="challenge-recap-item__stage">{ stage }</span>
      <span className="challenge-recap-item__chords">{ chords }</span>
      <span className={answerClass}>{ answerText }</span>
    </li>
  );
}

ChallengeRecapItem.propTypes = {
  answer: PropTypes.bool.isRequired,
  chords: PropTypes.array.isRequired,
  stage: PropTypes.number.isRequired,
};
