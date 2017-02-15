import React, { PropTypes } from 'react';

export default function BtnUp(props) {
  function moveUp() {
    window.scrollTo(0, 0);

    props.hideBtnUp();
  }

  return (
    <button className="btn-up" onClick={moveUp}>
      <svg className="btn-up__icon">
        <use xlinkHref="#icon-arrow-up" />
      </svg>
    </button>
  );
}

BtnUp.propTypes = {
  hideBtnUp: PropTypes.func.isRequired,
};
