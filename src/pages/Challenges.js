import React, { Component, PropTypes } from 'react';

import debouce from '../utility/debouce';

import BtnUp from '../components/BtnUp';
import ChallengesList from '../components/ChallengesList';

export default class Challenges extends Component {
  constructor(props) {
    super(props);

    this.checkScrollPosition = debouce(this.checkScrollPosition.bind(this), 10);
  }

  componentWillMount() {
    window.addEventListener('scroll', this.checkScrollPosition);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.checkScrollPosition);
    this.props.hideBtnUp();
  }

  checkScrollPosition() {
    if (window.pageYOffset > 150 && !this.props.challenges.displayBtnUp) {
      this.props.showBtnUp();
    } else if (window.pageYOffset < 150 && this.props.challenges.displayBtnUp) {
      this.props.hideBtnUp();
    }
  }

  render() {
    const { props } = this;
    const btnUp = (props.challenges.displayBtnUp) ? <BtnUp hideBtnUp={props.hideBtnUp} /> : null;

    return (
      <div className="challenges">
        <ChallengesList challenges={this.props.challenges.data} />
        { btnUp }
      </div>
    );
  }
}

Challenges.propTypes = {
  challenges: PropTypes.shape({
    data: PropTypes.array,
    displayBtnUp: PropTypes.bool,
  }),
  hideBtnUp: PropTypes.func,
  showBtnUp: PropTypes.func,
};

Challenges.defaultProps = {
  challenges: {
    data: [],
    displayBtnUp: false,
  },
  hideBtnUp: () => {},
  showBtnUp: () => {},
};
