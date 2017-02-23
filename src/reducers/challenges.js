import challengesData from '../data/challenges';

const storageData = JSON.parse(localStorage.getItem('challenges'));
const data = storageData || challengesData;
const defaultState = {
  data,
  displayBtnUp: false,
};

export default function challenges(state = defaultState, action) {
  switch (action.type) {
    case 'CREATE_CHALLENGE': {
      const newData = [...state.data, {
        id: action.id,
        stage: 'Custom',
        type: action.challengeType,
        chords: action.chords,
      }];

      localStorage.setItem('challenges', JSON.stringify(newData));
      return Object.assign({}, state, { data: newData });
    }
    case 'DELETE_CHALLENGE': {
      const newData = state.data.filter(challenge => challenge.id !== action.id);

      localStorage.setItem('challenges', JSON.stringify(newData));
      return Object.assign({}, state, { data: newData });
    }
    case 'SAVE_DATA_IN_STORAGE':
      if (!storageData) localStorage.setItem('challenges', JSON.stringify(state.data));
      return state;
    case 'SHOW_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: true });
    case 'HIDE_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: false });
    default:
      return state;
  }
}
