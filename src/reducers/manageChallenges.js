const defaultState = {
  chords: ['A', 'D', 'E', 'Am', 'Dm', 'Em', 'C', 'G', 'B7', 'C7', 'G7'],
  displayCustomChallengePopup: false,
  challengeTypes: ['Single', 'Progression'],
  noticeMessage: '',
};

export default function manageChallenges(state = defaultState, action) {
  switch (action.type) {
    case 'TOGGLE_CUSTOM_CHALLENGE_POPUP':
      return Object.assign({}, state, {
        displayCustomChallengePopup: !state.displayCustomChallengePopup,
      });
    case 'SET_NOTICE_MESSAGE':
      return Object.assign({}, state, { noticeMessage: action.message });
    default:
      return state;
  }
}
