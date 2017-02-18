import React from 'react';

export default function ChallengesListHeader() {
  return (
    <li className="challenges-list-header">
      <span className="challenges-list-header__stage">Stage</span>
      <span className="challenges-list-header__type">Type</span>
      <span className="challenges-list-header__chords">Chords</span>
    </li>
  );
}
