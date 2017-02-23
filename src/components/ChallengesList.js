import React, { PropTypes } from 'react';

export default function ChallengesList(props) {
  const Item = props.item;
  return (
    <ul className="challenges-list">
      <li className="challenges-list__header">
        <span className="challenges-list__stage">Stage</span>
        <span className="challenges-list__type">Type</span>
        <span className="challenges-list__chords">Chords</span>
      </li>
      { props.challenges.map(challenge => <Item
        key={challenge.id}
        {...challenge}
        {...props}
      />) }
    </ul>
  );
}

ChallengesList.propTypes = {
  challenges: PropTypes.array.isRequired,
  item: PropTypes.func.isRequired,
};
