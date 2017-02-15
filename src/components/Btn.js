import React, { PropTypes } from 'react';

export default function Btn(props) {
  const btnDefaultClass = 'btn';
  const btnClass = props.mods.reduce(
    (result, mod) => result.concat(`${btnDefaultClass}--${mod}`), [btnDefaultClass],
  ).join(' ');

  return (
    <button
      onClick={props.handleClick}
      className={btnClass}
    >
      { props.text }
    </button>
  );
}

Btn.propTypes = {
  handleClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  mods: PropTypes.array,
};

Btn.defaultProps = {
  mods: [],
};
