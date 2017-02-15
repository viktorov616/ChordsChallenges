import React, { Component, PropTypes } from 'react';

import Answers from '../components/Answers';
import Btn from '../components/Btn';
import ChordsList from '../components/ChordsList';
import ChallengeRecapPopup from '../components/ChallengeRecapPopup';
import CluePopup from '../components/CluePopup';
import GuessList from '../components/GuessList';

import checkStringNullPropType from '../utility/checkStringNullPropType';
import getRandomNum from '../utility/getRandomNum';

export default class Challenge extends Component {
  static clearTimeouts(timeouts) {
    timeouts.forEach(timeout => clearTimeout(timeout));
  }

  static computeChordsSounds(chords) {
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
    this.handlePlayChordSound = this.handlePlayChordSound.bind(this);
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

  componentDidUpdate(prevProps) {
    const prevStage = prevProps.challenge.stage;
    const currentStage = this.props.challenge.stage;

    if (prevStage !== currentStage) {
      this.handlePlayChordSound();
    }
  }

  componentWillUnmount() {
    this.props.resetChallengeStore();
    this.stopChordSound();
  }

  setInitialState() {
    const progressionChordsNumber = this.computeProgressionChordsNumber();
    const challengeChords = this.computeChallengeChords();
    const challengeType = this.computeChallengeType();
    const currentChords = this.computeCurrentChords(
      challengeChords, challengeType, progressionChordsNumber,
    );
    const chordsSounds = this.constructor.computeChordsSounds(challengeChords);

    this.props.setChallengeChords(challengeChords);
    this.props.setCurrentChords(currentChords);
    this.props.setChordsSounds(chordsSounds);
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

    if (/Single/.test(challengeType)) {
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

  handlePlayChordSound() {
    const { stage, challengeType, currentChords } = this.props.challenge;

    this.stopChordSound();

    if (/Single/.test(challengeType)) {
      const chord = currentChords[stage][0];

      this.playChordSound(chord);
    } else {
      const timeoutsIds = [];

      currentChords[stage].forEach((chord, i) => {
        timeoutsIds[i] = setTimeout(() => {
          this.playChordSound(chord);
        }, i * 1000);
      });

      this.props.setTimeoutsIds(timeoutsIds);
    }
  }

  playChordSound(chord) {
    const { chordsSounds } = this.props.challenge;
    const chordSound = chordsSounds[chord];

    chordSound.currentTime = 0;
    chordSound.play();
  }

  stopChordSound() {
    const {
      challengeType, chordsSounds, currentChords, stage, timeoutsIds,
    } = this.props.challenge;

    if (/Single/.test(challengeType)) {
      const chord = currentChords[stage][0];
      const chordSound = chordsSounds[chord];

      chordSound.pause();
      chordSound.currentTime = 0;
    } else {
      this.constructor.clearTimeouts(timeoutsIds);

      currentChords[stage].forEach((chord) => {
        const chordSound = chordsSounds[chord];
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
    const {
      answers, challengeType, currentChords, lastAnswer, showCluePopup, showRecapPopup, stage,
    } = props.challenge;
    const cluePopup = (showCluePopup)
      ? (<CluePopup
        chords={props.challenge.challengeChords}
        playChordSound={this.playChordSound}
        toggleCluePopup={props.toggleCluePopup}
      />)
      : null;
    const nextStageBtn = (lastAnswer && stage !== answers.length - 1)
      ? <Btn handleClick={this.handleSetNexStage} text={'Next stage'} />
      : null;
    const recapPopupBtn = (lastAnswer && stage === answers.length - 1)
      ? <Btn handleClick={props.toggleRecapPopup} text={'End challenge'} />
      : null;
    const recapPopup = (showRecapPopup)
      ? (<ChallengeRecapPopup
        answers={answers}
        currentChords={currentChords}
        resetChallengeStore={this.handleResetChallengeStore}
        toggleRecapPopup={props.toggleRecapPopup}
      />)
      : null;
    const clearBtn = (/Progression/.test(challengeType))
      ? (<Btn
        handleClick={this.props.clearProgressionGuesses}
        mods={['no-margin-right']}
        text={'Clear'}
      />)
      : null;
    const removeLastBtn = (/Progression/.test(challengeType))
      ? (<Btn
        handleClick={this.props.removeLastProgressionGuess}
        mods={['no-margin-right']}
        text={'Remove last'}
      />)
      : null;

    return (
      <div className="challenge">
        <div className="challenge__controls">
          <Btn
            handleClick={this.props.toggleCluePopup}
            mods={['no-margin-right']}
            text={'Clue mode'}
          />
          <Btn
            handleClick={this.handleResetChallengeStore}
            mods={['no-margin-right']}
            text={'Restart'}
          />
          { clearBtn }
          { removeLastBtn }
        </div>
        <div className="challenge__content">
          <Answers
            answers={props.challenge.answers}
            lastAnswer={props.challenge.lastAnswer}
            stage={props.challenge.stage}
          />
          <GuessList guesses={props.challenge.progressionGuesses} />
          <div className="challenge__audio-controls">
            <Btn handleClick={this.handlePlayChordSound} text={'Play'} />
            <Btn handleClick={this.stopChordSound} text={'Stop'} />
          </div>
          <div className="challenge__stage-controls">
            { nextStageBtn }
            { recapPopupBtn }
          </div>
          <ChordsList
            chords={props.challenge.challengeChords}
            handleClick={this.handleSetAnswer}
          />
        </div>
        { cluePopup }
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
    chordsSounds: PropTypes.object,
    lastAnswer: checkStringNullPropType,
    progressionGuesses: PropTypes.array,
    progressionChordsNumber: PropTypes.number,
    showCluePopup: PropTypes.bool,
    showRecapPopup: PropTypes.bool,
    stage: PropTypes.number,
    timeoutsIds: PropTypes.array,
  }),
  clearProgressionGuesses: PropTypes.func,
  params: PropTypes.shape({
    challengeId: PropTypes.string,
  }),
  removeLastProgressionGuess: PropTypes.func,
  resetChallengeStore: PropTypes.func,
  setChallengeChords: PropTypes.func,
  setChallengeType: PropTypes.func,
  setChordsSounds: PropTypes.func,
  setCurrentChords: PropTypes.func,
  setLastAnswer: PropTypes.func,
  setProgressionGuesses: PropTypes.func,
  setProgressionChordsNumber: PropTypes.func,
  setStage: PropTypes.func,
  setTimeoutsIds: PropTypes.func,
  setUserAnswer: PropTypes.func,
  toggleCluePopup: PropTypes.func,
  toggleRecapPopup: PropTypes.func,
};

Challenge.defaultProps = {
  challenges: [],
  challenge: {
    answers: [],
    challengeChords: [],
    challengeType: '',
    currentChords: [],
    chordsSounds: {},
    lastAnswer: null,
    progressionGuesses: [],
    progressionChordsNumber: 4,
    showCluePopup: false,
    showREcapPopup: false,
    stage: 0,
    timeoutsIds: [],
  },
  clearProgressionGuesses: () => {},
  params: {
    challengeId: '',
  },
  removeLastProgressionGuess: () => {},
  resetChallengeStore: () => {},
  setChallengeChords: () => {},
  setChallengeType: () => {},
  setChordsSounds: () => {},
  setCurrentChords: () => {},
  setLastAnswer: () => {},
  setProgressionGuesses: () => {},
  setProgressionChordsNumber: () => {},
  setStage: () => {},
  setTimeoutsIds: () => {},
  setUserAnswer: () => {},
  toggleCluePopup: () => {},
  toggleRecapPopup: () => {},
};
