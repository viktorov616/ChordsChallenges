import React, { Component, PropTypes } from 'react';

export default class Select extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { name, options, selectValue } = this.props;
    const initialValue = selectValue || options[0];

    this.props.handleChange(name, initialValue);
  }

  handleChange(e) {
    this.props.handleChange(this.props.name, e.target.value);
  }

  render() {
    const { props } = this;

    return (
      <div className="select">
        <select
          onClick={props.handleClick}
          className="select__tag"
          onChange={this.handleChange}
        >
          { props.options.map(option => <option
            key={option}
            value={option}
          >
            { option }
          </option>) }
        </select>
      </div>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  handleChange: PropTypes.func,
  handleClick: PropTypes.func,
  name: PropTypes.string,
  selectValue: PropTypes.string,
};

Select.defaultProps = {
  handleChange: () => {},
  handleClick: () => {},
  name: '',
  selectValue: '',
};
