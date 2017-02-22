import React, { PropTypes } from 'react';
import { Link } from 'react-router';

import Btn from './Btn';
import ChallengeRecapItem from './ChallengeRecapItem';
import Form from './Form';


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
    <Form
      className="challenge-recap-popup"
      toggleForm={props.toggleRecapPopup}
    >
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
        <Btn handleClick={props.resetChallengeStore} text={'Restart'} />
        <Link to="/" className="btn">Back to challenges</Link>
      </div>
    </Form>
  );
}

ChallengeRecapPopup.propTypes = {
  answers: PropTypes.array.isRequired,
  currentChords: PropTypes.array.isRequired,
  resetChallengeStore: PropTypes.func.isRequired,
  toggleRecapPopup: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
};
