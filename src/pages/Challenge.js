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

  static computeNextStage(stage) {
    return stage + 1;
  }

  constructor(props) {
    super(props);

    this.computeChallengeChords = this.computeChallengeChords.bind(this);
    this.computeChallengeType = this.computeChallengeType.bind(this);
    this.computeCurrentChords = this.computeCurrentChords.bind(this);
    this.playChordSound = this.playChordSound.bind(this);
    this.stopChordSound = this.stopChordSound.bind(this);
    this.handleSetAnswer = this.handleSetAnswer.bind(this);
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

  componentWillReceiveProps(nextProps) {
    const { answers, stage, lastAnswer } = nextProps.challenge;
    const lastStage = answers.length - 1;
    console.count('receive');

    if (lastAnswer && stage !== lastStage) {
      const nextStage = this.constructor.computeNextStage(stage);
      this.props.setStage(nextStage);
      this.props.setLastAnswer(null);
    }
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
    const { answers, currentChords, stage, challengeType } = this.props.challenge;
    const correctAnswer = currentChords[stage];
    const guess = e.target.textContent;
    const userAnswer = answers[stage].value;
    let isGuessCorrect;

    if (/Single/.test(challengeType)) {
      isGuessCorrect = guess === correctAnswer;

      if (userAnswer === null) {
        this.props.setUserAnswer(isGuessCorrect, stage);
        this.props.setLastAnswer(isGuessCorrect);
      } else {
        this.props.setLastAnswer(isGuessCorrect);
      }
    }
  }

  render() {
    const props = this.props;

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
