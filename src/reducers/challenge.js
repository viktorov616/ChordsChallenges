import generateAnswers from '../utility/generateAnswers';

const answers = generateAnswers(5);

const defaultState = {
  answers,
  challengeChords: [],
  challengeType: '',
  currentChords: [],
  currentChordsSounds: {},
  lastAnswer: null,
  progressionGuesses: [],
  progressionChordsNumber: 4,
  stage: 0,
  showRecapPopup: false,
  timeoutsIds: [],
};

export default function challenge(state = defaultState, action) {
  switch (action.type) {
    case 'CLEAR_PROGRESSION_GUESSES':
      return Object.assign({}, state, { progressionGuesses: [] });
    case 'RESET_CHALLENGE_STORE':
      return defaultState;
    case 'SET_CHALLENGE_CHORDS':
      return Object.assign({}, state, { challengeChords: action.chords });
    case 'SET_CURRENT_CHORDS_SOUNDS':
      return Object.assign({}, state, { currentChordsSounds: action.sounds });
    case 'SET_CHALLENGE_TYPE':
      return Object.assign({}, state, { challengeType: action.challengeType });
    case 'SET_CURRENT_CHORDS':
      return Object.assign({}, state, { currentChords: action.chords });
    case 'SET_LAST_ANSWER':
      return Object.assign({}, state, { lastAnswer: action.answer });
    case 'SET_PROGRESSION_CHORDS_NUMBER':
      return Object.assign({}, state, { progressionChordsNumber: action.number });
    case 'SET_PROGRESSION_GUESSES':
      return Object.assign({}, state, {
        progressionGuesses: [...state.progressionGuesses, action.guess],
      });
    case 'SET_STAGE':
      return Object.assign({}, state, { stage: action.stage });
    case 'SET_TIMEOUTS_IDS':
      return Object.assign({}, state, { timeoutsIds: action.timeoutsIds });
    case 'SET_USER_ANSWER': {
      const { stage: i, answer } = action;
      const { answers: currentAnswers } = state;

      return Object.assign({}, state, {
        answers: [
          ...currentAnswers.slice(0, i),
          Object.assign({}, answers[i], { value: answer }),
          ...currentAnswers.slice(i + 1),
        ],
      });
    }

    case 'TOGGLE_RECAP_POPUP':
      return Object.assign({}, state, { showRecapPopup: !state.showRecapPopup });
    default:
      return state;
  }
}
