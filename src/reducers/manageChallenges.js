const defaultState = {
  displayCustomChallengeForm: false,
};

export default function manageChallenges(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_CUSTOM_CHALLENGE_FORM':
      return Object.assign({}, state, {
        displayCustomChallengeForm: !state.displayCustomChallengeForm,
      });
    default:
      return state;
  }
}
