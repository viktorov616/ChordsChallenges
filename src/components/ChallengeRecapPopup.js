import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Btn from './Btn';
import ChallengeRecapItem from './ChallengeRecapItem';


export default function ChallengeRecapPopup(props) {
  function computeAccuracy(answers) {
    const correctAnswers = answers
      .reduce((result, answer) => ((answer.value) ? result + 1 : result), 0);
    const accuracy = Math.round((100 * correctAnswers) / props.answers.length);

    return accuracy;
  }

  const accuracy = computeAccuracy(props.answers);
  const chordsHeader = (props.type === 'Single') ? 'Chord' : 'Chords';

  return (
    <div className="challenge-recap-popup">
      <div className="challenge-recap-popup__content">
        <h1 className="challenge-recap-popup__header">Results</h1>
        <p className="challenge-recap-popup__text">
          <span className="challenge-recap-popup__text-title">Accuracy: </span>{accuracy}%
        </p>
        <ul className="challenge-recap-popup__answers">
          <li className="challenge-recap-popup__item">
            <span className="challenge-recap-popup__stage">Stage</span>
            <span className="challenge-recap-popup__chords">{ chordsHeader }</span>
            <span className="challenge-recap-popup__answer">Answer</span>
          </li>
          { props.answers.map((answer, i) => <ChallengeRecapItem
            key={answer.id}
            answer={answer.value}
            chords={props.currentChords[i]}
            stage={i}
          />) }
        </ul>
        <div className="challenge-recap-popup__controls">
          <Btn clickFunc={props.resetChallengeStore} text={'Restart'} />
          <Link to="/" className="btn">Back to challenges</Link>
        </div>
        <svg
          className="challenge-recap-popup__btn-close"
          width="25" height="25"
          onClick={props.toggleRecapPopup}
        >
          <use xlinkHref="#icon-cross" />
        </svg>
      </div>
    </div>
  );
}

ChallengeRecapPopup.propTypes = {
  answers: PropTypes.array.isRequired,
  currentChords: PropTypes.array.isRequired,
  resetChallengeStore: PropTypes.func.isRequired,
  toggleRecapPopup: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
