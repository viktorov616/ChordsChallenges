const defaultState = {
  chords: ['A', 'D', 'E', 'Am', 'Dm', 'Em', 'C', 'G', 'B7', 'C7', 'G7'],
  challengeTypes: ['Single', 'Progression'],
  selectedType: '',
  selectedChords: [],
  noticeMessage: {
    mod: '',
    value: '',
  },
};

export default function customChallengeForm(state = defaultState, action) {
  switch (action.type) {
    case 'CLEAR_CUSTOM_CHALLENGE_CHECKBOXES_VALUES':
      return Object.assign({}, state, { [action.key]: [] });
    case 'CUSTOM_CHALLENGE_CHECKBOX_ACTIVATED':
      return Object.assign({}, state, {
        [action.key]: [...state[action.key], action.value],
      });
    case 'CUSTOM_CHALLENGE_CHECKBOX_DEACTIVATED':
      return Object.assign({}, state, {
        [action.key]: state[action.key]
          .filter(value => value !== action.value),
      });
    case 'SET_NOTICE_MESSAGE':
      return Object.assign({}, state, {
        noticeMessage: {
          mod: action.mod,
          value: action.message,
        },
      });
    case 'UPDATE_CUSTOM_CHALLENGE_FORM':
      return Object.assign({}, state, {
        [action.key]: action.value,
      });
    default:
      return state;
  }
}
