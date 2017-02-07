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
