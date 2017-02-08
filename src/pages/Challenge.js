import React, { Component, PropTypes } from 'react';

import Answers from '../components/Answers';
import AudioControls from '../components/AudioControls';
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
    this.computeCurrentChords = this.computeCurrentChords.bind(this);
    this.playChordSound = this.playChordSound.bind(this);
    this.stopChordSound = this.stopChordSound.bind(this);
    this.handleSetAnswer = this.handleSetAnswer.bind(this);
  }

  componentWillMount() {
    const challengeChords = this.computeChallengeChords();
    const currentChords = this.computeCurrentChords(challengeChords);
    const currentChordsSounds = this.constructor.computeCurrentChordsSounds(currentChords);

    this.props.setChallengeChords(challengeChords);
    this.props.setCurrentChords(currentChords);
    this.props.setCurrentChordsSounds(currentChordsSounds);
  }

  computeChallengeChords() {
    const i = this.props.params.challengeId - 1;
    const challengeChords = this.props.challenges[i].chords;

    return challengeChords;
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

  handleSetAnswer() {
    return this;
  }

  render() {
    const props = this.props;

    return (
      <div className="challenge">
        <Answers
          answers={props.challenge.answers}
          userAnswer={props.challenge.userAnswer}
          stage={props.challenge.stage}
        />
        <AudioControls
          play={this.playChordSound}
          stop={this.stopChordSound}
        />
        <ChordsList
          chords={props.challenge.challengeChords}
          handleClick={this.handleSetAnswer}
        />
      </div>
    );
  }
}

Challenge.propTypes = {
  setChallengeChords: PropTypes.func.isRequired,
  setCurrentChords: PropTypes.func.isRequired,
  setCurrentChordsSounds: PropTypes.func.isRequired,
  challenges: PropTypes.object.isRequired,
  challenge: PropTypes.shape({
    answers: PropTypes.array.isRequired,
    challengeChords: PropTypes.array.isRequired,
    currentChords: PropTypes.array.isRequired,
    currentChordsSounds: PropTypes.array.isRequired,
    stage: PropTypes.number.isRequired,
    lastAnswer: checkStringNullPropType,
    userAnswer: checkStringNullPropType,
  }).isRequired,
  params: PropTypes.shape({
    challengeId: PropTypes.string.isRequired,
  }).isRequired,
};
