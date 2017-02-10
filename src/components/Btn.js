import React, { PropTypes } from 'react';

export default function Btn(props) {
  return (
    <button
      onClick={props.clickFunc}
      className="btn"
    >
      { props.text }
    </button>
  );
}

Btn.propTypes = {
  clickFunc: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
