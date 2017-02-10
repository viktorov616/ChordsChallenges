import React, { Component, PropTypes } from 'react';

import Answers from '../components/Answers';
import Btn from '../components/Btn';
import ChordsList from '../components/ChordsList';

import checkStringNullPropType from '../utility/checkStringNullPropType';
import getRandomNum from '../utility/getRandomNum';

export default class Challenge extends Component {
  static computeCurrentChordsSounds(chords) {
    const chordsSounds = chords.map(chord => new Audio(require(`../sounds/${chord}.wav`)));

    return chordsSounds;
  }

  constructor(props) {
    super(props);

    this.computeChallengeChords = this.computeChallengeChords.bind(this);
    this.computeChallengeType = this.computeChallengeType.bind(this);
    this.computeCurrentChords = this.computeCurrentChords.bind(this);
    this.playChordSound = this.playChordSound.bind(this);
    this.stopChordSound = this.stopChordSound.bind(this);
    this.handleSetAnswer = this.handleSetAnswer.bind(this);
    this.handleSetNexStage = this.handleSetNexStage.bind(this);
  }

  componentWillMount() {
    const challengeChords = this.computeChallengeChords();
    const challengeType = this.computeChallengeType();
    const currentChords = this.computeCurrentChords(challengeChords);
    const currentChordsSounds = this.constructor.computeCurrentChordsSounds(currentChords);

    this.props.setChallengeChords(challengeChords);
    this.props.setCurrentChords(currentChords);
    this.props.setCurrentChordsSounds(currentChordsSounds);
    this.props.setChallengeType(challengeType);
  }

  componentWillUpdate() {
    console.count('update');
  }

  computeChallengeChords() {
    const i = this.props.params.challengeId - 1;
    const challengeChords = this.props.challenges[i].chords;

    return challengeChords;
  }

  computeChallengeType() {
    const i = this.props.params.challengeId - 1;
    const challengeType = this.props.challenges[i].type;

    return challengeType;
  }

  computeCurrentChords(chords) {
    const max = chords.length - 1;
    const chordsNumber = this.props.challenge.answers.length;
    const currentChords = new Array(chordsNumber).fill().map(() => {
      const n = getRandomNum(0, max);
      const chord = chords[n];

      return chord;
    });

    return currentChords;
  }

  playChordSound() {
    const { stage } = this.props.challenge;
    const chord = this.props.challenge.currentChordsSounds[stage];

    chord.currentTime = 0;
    chord.play();
  }

  stopChordSound() {
    const { stage } = this.props.challenge;
    const chord = this.props.challenge.currentChordsSounds[stage];

    chord.pause();
    chord.currentTime = 0;
  }

  handleSetAnswer(e) {
    const { answers, currentChords, challengeType, stage, lastAnswer } = this.props.challenge;
    const correctAnswer = currentChords[stage];
    const guess = e.target.textContent;
    const userAnswer = answers[stage].value;
    let isGuessCorrect;

    if (/Single/.test(challengeType)) {
      isGuessCorrect = guess === correctAnswer;

      if (userAnswer === null) {
        this.props.setUserAnswer(isGuessCorrect, stage);
        this.props.setLastAnswer(isGuessCorrect);
      } else if (lastAnswer !== true) {
        this.props.setLastAnswer(isGuessCorrect);
      }
    }
  }

  handleSetNexStage() {
    const nextStage = this.props.challenge.stage + 1;
    this.props.setStage(nextStage);
    this.props.setLastAnswer(null);
  }

  render() {
    const props = this.props;
    const { lastAnswer, stage, answers } = props.challenge;
    const nextStageBtn = (lastAnswer && stage !== answers.length - 1)
      ? <Btn clickFunc={this.handleSetNexStage} text={'Next stage'} />
      : null;

    return (
      <div className="challenge">
        <Answers
          answers={props.challenge.answers}
          lastAnswer={props.challenge.lastAnswer}
          stage={props.challenge.stage}
        />
        <div className="challenge__audio-controls">
          <Btn clickFunc={this.playChordSound} text={'Play'} />
          <Btn clickFunc={this.stopChordSound} text={'Stop'} />
        </div>
        <div className="challenge__next-stage">
          { nextStageBtn }
        </div>
        <ChordsList
          chords={props.challenge.challengeChords}
          handleClick={this.handleSetAnswer}
        />
      </div>
    );
  }
}

Challenge.propTypes = {
  setChallengeChords: PropTypes.func,
  setChallengeType: PropTypes.func,
  setCurrentChords: PropTypes.func,
  setCurrentChordsSounds: PropTypes.func,
  setLastAnswer: PropTypes.func,
  setUserAnswer: PropTypes.func,
  setStage: PropTypes.func,
  challenges: PropTypes.array,
  challenge: PropTypes.shape({
    answers: PropTypes.array,
    challengeChords: PropTypes.array,
    challengeType: PropTypes.string,
    currentChords: PropTypes.array,
    currentChordsSounds: PropTypes.array,
    stage: PropTypes.number,
    lastAnswer: checkStringNullPropType,
  }),
  params: PropTypes.shape({
    challengeId: PropTypes.string,
  }),
};

Challenge.defaultProps = {
  setChallengeChords: () => {},
  setChallengeType: () => {},
  setCurrentChords: () => {},
  setCurrentChordsSounds: () => {},
  setLastAnswer: () => {},
  setUserAnswer: () => {},
  setStage: () => {},
  challenges: [],
  challenge: {
    answers: [],
    challengeChords: [],
    challengeType: '',
    currentChords: [],
    currentChordsSounds: [],
    stage: 0,
    lastAnswer: null,
    userAnswer: null,
  },
  params: {
    challengeId: '',
  },
};
