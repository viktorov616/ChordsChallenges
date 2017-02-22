import React, { Component, PropTypes } from 'react';

export default class Form extends Component {
  constructor(props) {
    super(props);

    this.handleEsc = this.handleEsc.bind(this);
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleEsc);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleEsc);
  }

  handleEsc(e) {
    if (e.keyCode === 27) {
      this.props.toggleForm();
    }
  }

  render() {
    const { props } = this;

    return (
      <form className="form" onSubmit={props.handleSubmit}>
        <div className={props.className}>
          { props.children }
          <svg
            className={`${props.className}__btn-close`}
            width="25" height="25"
            onClick={props.toggleForm}
          >
            <use xlinkHref="#icon-cross" />
          </svg>
        </div>
      </form>
    );
  }
}

Form.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  handleSubmit: PropTypes.func,
  toggleForm: PropTypes.func,
};

Form.defaultProps = {
  children: null,
  className: '',
  handleSubmit: () => {},
  toggleForm: () => {},
};
