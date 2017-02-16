import React, { PropTypes } from 'react';

import Btn from './Btn';

export default function ChallengeControls(props) {
  const { challengeType } = props;
  const clearBtn = (/Progression/.test(challengeType))
    ? (<Btn
      handleClick={props.clearProgressionGuesses}
      mods={['no-margin-right']}
      text={'Clear'}
    />)
    : null;
  const removeLastBtn = (/Progression/.test(challengeType))
    ? (<Btn
      handleClick={props.removeLastProgressionGuess}
      mods={['no-margin-right']}
      text={'Remove last'}
    />)
    : null;

  return (
    <div className="challenge-controls">
      <Btn
        handleClick={props.toggleCluePopup}
        mods={['no-margin-right']}
        text={'Clue mode'}
      />
      <Btn
        handleClick={props.restart}
        mods={['no-margin-right']}
        text={'Restart'}
      />
      { clearBtn }
      { removeLastBtn }
    </div>
  );
}

ChallengeControls.propTypes = {
  challengeType: PropTypes.string.isRequired,
  clearProgressionGuesses: PropTypes.func.isRequired,
  removeLastProgressionGuess: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  toggleCluePopup: PropTypes.func.isRequired,
};
