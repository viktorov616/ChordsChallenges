import challengesData from '../data/challenges';

const defaultState = {
  data: challengesData,
  displayBtnUp: false,
};

export default function challenges(state = defaultState, action) {
  switch (action.type) {
    case 'CREATE_CHALLENGE':
      return Object.assign({}, state, { data: [...state.data, {
        id: action.id,
        stage: 'Custom',
        type: action.challengeType,
        chords: action.chords,
      }] });
    case 'SHOW_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: true });
    case 'HIDE_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: false });
    default:
      return state;
  }
}
