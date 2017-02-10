import generateAnswers from '../utility/generateAnswers';

const answers = generateAnswers(5);

const defaultState = {
  answers,
  challengeChords: [],
  currentChords: [],
  currentChordsSounds: [],
  stage: 0,
  lastAnswer: null,
  challengeType: '',
};

export default function challenge(state = defaultState, action) {
  switch (action.type) {
    case 'SET_CHALLENGE_CHORDS':
      return Object.assign({}, state, { challengeChords: action.chords });
    case 'SET_CURRENT_CHORDS':
      return Object.assign({}, state, { currentChords: action.chords });
    case 'SET_CURRENT_CHORDS_SOUNDS':
      return Object.assign({}, state, { currentChordsSounds: action.sounds });
    case 'SET_CHALLENGE_TYPE':
      return Object.assign({}, state, { challengeType: action.challengeType });
    case 'SET_LAST_ANSWER':
      return Object.assign({}, state, { lastAnswer: action.answer });
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
    case 'SET_STAGE':
      return Object.assign({}, state, { stage: action.stage });
    default:
      return state;
  }
}
