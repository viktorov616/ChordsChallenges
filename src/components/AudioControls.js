import React, { PropTypes } from 'react';

export default function AudioControls(props) {
  return (
    <div className="audio-controls">
      <button onClick={props.play} className="btn audio-controls__btn">Play</button>
      <button onClick={props.stop} className="btn audio-controls__btn">Stop</button>
    </div>
  );
}

AudioControls.propTypes = {
  play: PropTypes.func.isRequired,
  stop: PropTypes.func.isRequired,
};
