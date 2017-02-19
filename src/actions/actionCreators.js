export function clearProgressionGuesses() {
  return {
    type: 'CLEAR_PROGRESSION_GUESSES',
  };
}

export function createChallenge(id, challengeType, chords) {
  return {
    type: 'CREATE_CHALLENGE',
    id,
    challengeType,
    chords,
  };
}

export function removeLastProgressionGuess() {
  return {
    type: 'REMOVE_LAST_PROGRESSION_GUESS',
  };
}

export function resetChallengeStore() {
  return {
    type: 'RESET_CHALLENGE_STORE',
  };
}

export function setChallengeChords(chords) {
  return {
    type: 'SET_CHALLENGE_CHORDS',
    chords,
  };
}

export function setCurrentChords(chords) {
  return {
    type: 'SET_CURRENT_CHORDS',
    chords,
  };
}

export function setChordsSounds(sounds) {
  return {
    type: 'SET_CHORDS_SOUNDS',
    sounds,
  };
}

export function setChallengeType(challengeType) {
  return {
    type: 'SET_CHALLENGE_TYPE',
    challengeType,
  };
}

export function setLastAnswer(answer) {
  return {
    type: 'SET_LAST_ANSWER',
    answer,
  };
}

export function setNoticeMessage(message = '', mod = '') {
  console.log(message);
  return {
    type: 'SET_NOTICE_MESSAGE',
    message,
    mod,
  };
}

export function setProgressionGuesses(guess, id) {
  return {
    type: 'SET_PROGRESSION_GUESSES',
    guess,
    id,
  };
}

export function setProgressionChordsNumber(number) {
  return {
    type: 'SET_PROGRESSION_CHORDS_NUMBER',
    number,
  };
}

export function setStage(stage) {
  return {
    type: 'SET_STAGE',
    stage,
  };
}

export function setTimeoutsIds(timeoutsIds) {
  return {
    type: 'SET_TIMEOUTS_IDS',
    timeoutsIds,
  };
}

export function setUserAnswer(answer, stage) {
  return {
    type: 'SET_USER_ANSWER',
    answer,
    stage,
  };
}

export function showBtnUp() {
  return {
    type: 'SHOW_BTN_UP',
  };
}

export function hideBtnUp() {
  return {
    type: 'HIDE_BTN_UP',
  };
}

export function toggleCluePopup() {
  return {
    type: 'TOGGLE_CLUE_POPUP',
  };
}

export function toggleCustomChallengePopup() {
  return {
    type: 'TOGGLE_CUSTOM_CHALLENGE_POPUP',
  };
}

export function toggleRecapPopup() {
  return {
    type: 'TOGGLE_RECAP_POPUP',
  };
}
