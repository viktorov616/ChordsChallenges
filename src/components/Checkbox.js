import React, { PropTypes } from 'react';

export default function Checkbox(props) {
  function handleChange(e) {
    const { value } = e.target;
    const { groupName } = props;

    props.handleClick();

    if (e.target.checked) {
      props.handleCheckboxActivated(groupName, value);
      return;
    }

    props.handleCheckboxDeactivated(groupName, value);
  }

  return (
    <div className="checkbox">
      <input
        id={props.id}
        type="checkbox"
        onChange={handleChange}
        onClick={props.handleClick}
        className="checkbox__input"
        value={props.value}
      />
      <label
        htmlFor={props.id}
        className="checkbox__label"
      >
        { props.value }
      </label>
    </div>
  );
}

Checkbox.propTypes = {
  groupName: PropTypes.string.isRequired,
  handleCheckboxActivated: PropTypes.func.isRequired,
  handleCheckboxDeactivated: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

Checkbox.defaultProps = {
  handleClick: () => {},
};
