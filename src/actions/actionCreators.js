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

export function setCurrentChordsSounds(sounds) {
  return {
    type: 'SET_CURRENT_CHORDS_SOUNDS',
    sounds,
  };
}

export function setChallengeType(challengeType) {
  return {
    type: 'SET_CHALLENGE_TYPE',
    challengeType,
  };
}

export function setUserAnswer(answer, stage) {
  return {
    type: 'SET_USER_ANSWER',
    answer,
    stage,
  };
}

export function setLastAnswer(answer) {
  return {
    type: 'SET_LAST_ANSWER',
    answer,
  };
}

export function setStage(stage) {
  return {
    type: 'SET_STAGE',
    stage,
  };
}
