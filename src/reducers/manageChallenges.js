const defaultState = {
  displayBtnUp: false,
  displayCustomChallengeForm: false,
};

export default function manageChallenges(state = defaultState, action) {
  switch (action.type) {
    case 'HIDE_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: false });
    case 'SHOW_BTN_UP':
      return Object.assign({}, state, { displayBtnUp: true });
    case 'TOGGLE_CUSTOM_CHALLENGE_FORM':
      return Object.assign({}, state, {
        displayCustomChallengeForm: !state.displayCustomChallengeForm,
      });
    default:
      return state;
  }
}
