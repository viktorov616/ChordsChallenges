import generateAnswers from '../utility/generateAnswers';

const answers = generateAnswers(5);

const defaultState = {
  answers,
  challengeChords: [],
  currentChords: [],
  currentChordsSounds: [],
  stage: 0,
  lastAnswer: true,
};

export default function challenge(state = defaultState, action) {
  switch (action.type) {
    case 'SET_CHALLENGE_CHORDS':
      return Object.assign({}, state, { challengeChords: action.chords });
    case 'SET_CURRENT_CHORDS':
      return Object.assign({}, state, { currentChords: action.chords });
    case 'SET_CURRENT_CHORDS_SOUNDS':
      return Object.assign({}, state, { currentChordsSounds: action.sounds });
    default:
      return state;
  }
}
