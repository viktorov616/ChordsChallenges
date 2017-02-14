import React, { PropTypes } from 'react';

export default function Btn(props) {
  return (
    <button
      onClick={props.handleClick}
      className="btn"
    >
      { props.text }
    </button>
  );
}

Btn.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
