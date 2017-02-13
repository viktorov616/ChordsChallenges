import React, { Component, PropTypes } from 'react';

import Answers from '../components/Answers';
import Btn from '../components/Btn';
import ChordsList from '../components/ChordsList';
import ChallengeRecapPopup from '../components/ChallengeRecapPopup';
import GuessList from '../components/GuessList';

import checkStringNullPropType from '../utility/checkStringNullPropType';
import getRandomNum from '../utility/getRandomNum';

export default class Challenge extends Component {
  static clearTimeouts(timeouts) {
    timeouts.forEach(timeout => clearTimeout(timeout));
  }

  static computeCurrentChordsSounds(chords) {
    const chordsSounds = chords.reduce((result, chord) => Object.assign(
      {}, result, { [chord]: new Audio(require(`../sounds/${chord}.wav`)) },
    ), {});


    return chordsSounds;
  }

  constructor(props) {
    super(props);

    this.computeProgressionChordsNumber = this.computeProgressionChordsNumber.bind(this);
    this.computeChallengeChords = this.computeChallengeChords.bind(this);
    this.computeChallengeType = this.computeChallengeType.bind(this);
    this.computeCurrentChords = this.computeCurrentChords.bind(this);
    this.playChordSound = this.playChordSound.bind(this);
    this.setInitialState = this.setInitialState.bind(this);
    this.stopChordSound = this.stopChordSound.bind(this);
    this.handleResetChallengeStore = this.handleResetChallengeStore.bind(this);
    this.handleSetAnswer = this.handleSetAnswer.bind(this);
    this.handleSetNexStage = this.handleSetNexStage.bind(this);
  }

  componentWillMount() {
    console.count('mount');
    this.setInitialState();
  }

  componentWillUpdate() {
    console.count('update');
  }

  componentWillUnmount() {
    this.props.resetChallengeStore();
  }

  setInitialState() {
    const progressionChordsNumber = this.computeProgressionChordsNumber();
    const challengeChords = this.computeChallengeChords();
    const challengeType = this.computeChallengeType();
    const currentChords = this.computeCurrentChords(
      challengeChords, challengeType, progressionChordsNumber,
    );
    const currentChordsSounds = this.constructor.computeCurrentChordsSounds(challengeChords);

    this.props.setChallengeChords(challengeChords);
    this.props.setCurrentChords(currentChords);
    this.props.setCurrentChordsSounds(currentChordsSounds);
    this.props.setChallengeType(challengeType);
  }

  computeProgressionChordsNumber() {
    const i = this.props.params.challengeId - 1;
    const progressionChallengeChords = this.props.challenges[i].progressionChordsNumber;

    return progressionChallengeChords;
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

  computeCurrentChords(chords, challengeType, progressionChordsNumber = 4) {
    const max = chords.length - 1;
    const chordsNumber = this.props.challenge.answers.length;
    let currentChords;

    if (challengeType === 'Single') {
      currentChords = new Array(chordsNumber).fill().map(() => {
        const n = getRandomNum(0, max);
        const chord = [chords[n]];

        return chord;
      });
    } else {
      currentChords = new Array(chordsNumber).fill().map(() => {
        const progressionChords = new Array(progressionChordsNumber).fill().map(() => {
          const n = getRandomNum(0, max);
          const chord = chords[n];

          return chord;
        });

        return progressionChords;
      });
    }

    return currentChords;
  }

  playChordSound() {
    const { stage, challengeType, currentChordsSounds, currentChords } = this.props.challenge;

    this.stopChordSound();

    if (challengeType === 'Single') {
      const chord = currentChords[stage][0];
      const chordSound = currentChordsSounds[chord];

      chordSound.play();
    } else {
      const timeoutsIds = [];

      currentChords[stage].forEach((chord, i) => {
        const chordsSounds = currentChordsSounds[chord];

        timeoutsIds[i] = setTimeout(() => {
          chordsSounds.currentTime = 0;
          chordsSounds.play();
        }, i * 1000);
      });

      this.props.setTimeoutsIds(timeoutsIds);
    }
  }

  stopChordSound() {
    const {
      challengeType, currentChordsSounds, currentChords, stage, timeoutsIds,
    } = this.props.challenge;

    if (challengeType === 'Single') {
      const chord = currentChords[stage][0];
      const chordSound = currentChordsSounds[chord];

      chordSound.pause();
      chordSound.currentTime = 0;
    } else {
      this.constructor.clearTimeouts(timeoutsIds);

      currentChords[stage].forEach((chord) => {
        const chordSound = currentChordsSounds[chord];
        chordSound.pause();
        chordSound.currentTime = 0;
      });
    }
  }

  handleSetAnswer(e) {
    const {
      answers, currentChords, challengeType, lastAnswer, progressionGuesses,
      progressionChordsNumber, stage,
    } = this.props.challenge;
    const correctAnswer = currentChords[stage];
    const guess = e.target.textContent;
    const userAnswer = answers[stage].value;
    let isGuessCorrect;
    let progressionGuessesUpdated;

    if (/Single/.test(challengeType)) {
      isGuessCorrect = guess === correctAnswer[0];
    } else {
      if (lastAnswer === true) return;
      if (progressionGuesses.length !== progressionChordsNumber - 1) {
        this.props.setProgressionGuesses(guess);

        return;
      }
      progressionGuessesUpdated = [...progressionGuesses, guess];
      isGuessCorrect = progressionGuessesUpdated.every((item, i) =>
        item === currentChords[stage][i]);

      this.props.clearProgressionGuesses();
    }

    if (userAnswer === null) {
      this.props.setUserAnswer(isGuessCorrect, stage);
      this.props.setLastAnswer(isGuessCorrect);
    } else if (lastAnswer !== true) {
      this.props.setLastAnswer(isGuessCorrect);
    }
  }

  handleResetChallengeStore() {
    this.props.resetChallengeStore();
    this.setInitialState();
  }

  handleSetNexStage() {
    const nextStage = this.props.challenge.stage + 1;
    this.props.setStage(nextStage);
    this.props.setLastAnswer(null);
  }

  render() {
    const props = this.props;
    const { answers, currentChords, lastAnswer, stage } = props.challenge;
    const nextStageBtn = (lastAnswer && stage !== answers.length - 1)
      ? <Btn clickFunc={this.handleSetNexStage} text={'Next stage'} />
      : null;
    const recapPopupBtn = (lastAnswer && stage === answers.length - 1)
      ? <Btn clickFunc={props.toggleRecapPopup} text={'End challenge'} />
      : null;
    const recapPopup = (props.challenge.showRecapPopup)
      ? (<ChallengeRecapPopup
        answers={answers}
        currentChords={currentChords}
        resetChallengeStore={this.handleResetChallengeStore}
        toggleRecapPopup={props.toggleRecapPopup}
        type={props.challenge.challengeType}
      />)
      : null;

    return (
      <div className="challenge">
        <Answers
          answers={props.challenge.answers}
          lastAnswer={props.challenge.lastAnswer}
          stage={props.challenge.stage}
        />
        <GuessList guesses={props.challenge.progressionGuesses} />
        <div className="challenge__audio-controls">
          <Btn clickFunc={this.playChordSound} text={'Play'} />
          <Btn clickFunc={this.stopChordSound} text={'Stop'} />
        </div>
        <div className="challenge__stage-controls">
          { nextStageBtn }
          { recapPopupBtn }
        </div>
        <ChordsList
          chords={props.challenge.challengeChords}
          handleClick={this.handleSetAnswer}
        />
        { recapPopup }
      </div>
    );
  }
}

Challenge.propTypes = {
  challenges: PropTypes.array,
  challenge: PropTypes.shape({
    answers: PropTypes.array,
    challengeChords: PropTypes.array,
    challengeType: PropTypes.string,
    currentChords: PropTypes.array,
    currentChordsSounds: PropTypes.object,
    lastAnswer: checkStringNullPropType,
    progressionGuesses: PropTypes.array,
    progressionChordsNumber: PropTypes.number,
    stage: PropTypes.number,
    timeoutsIds: PropTypes.array,
  }),
  clearProgressionGuesses: PropTypes.func,
  params: PropTypes.shape({
    challengeId: PropTypes.string,
  }),
  resetChallengeStore: PropTypes.func,
  setChallengeChords: PropTypes.func,
  setChallengeType: PropTypes.func,
  setCurrentChordsSounds: PropTypes.func,
  setCurrentChords: PropTypes.func,
  setLastAnswer: PropTypes.func,
  setProgressionGuesses: PropTypes.func,
  setProgressionChordsNumber: PropTypes.func,
  setStage: PropTypes.func,
  setTimeoutsIds: PropTypes.func,
  setUserAnswer: PropTypes.func,
  toggleRecapPopup: PropTypes.func,
};

Challenge.defaultProps = {
  challenges: [],
  challenge: {
    answers: [],
    challengeChords: [],
    challengeType: '',
    currentChords: [],
    currentChordsSounds: {},
    lastAnswer: null,
    progressionGuesses: [],
    progressionChordsNumber: 4,
    stage: 0,
    timeoutsIds: [],
  },
  clearProgressionGuesses: () => {},
  params: {
    challengeId: '',
  },
  resetChallengeStore: () => {},
  setChallengeChords: () => {},
  setChallengeType: () => {},
  setCurrentChordsSounds: () => {},
  setCurrentChords: () => {},
  setLastAnswer: () => {},
  setProgressionGuesses: () => {},
  setProgressionChordsNumber: () => {},
  setStage: () => {},
  setTimeoutsIds: () => {},
  setUserAnswer: () => {},
  toggleRecapPopup: () => {},
};
