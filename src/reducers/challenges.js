import challengesData from '../data/challenges';

const defaultState = {
  data: challengesData,
  displayBtnUp: false,
};

export default function challenges(state = defaultState, action) {
  switch (action.type) {
    case 'SHOW_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: true });
    case 'HIDE_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: false });
    default:
      return state;
  }
}
