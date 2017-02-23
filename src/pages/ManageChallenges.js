import React, { Component, PropTypes } from 'react';

import Btn from '../components/Btn';
import BtnUp from '../components/BtnUp';
import ChallengesList from '../components/ChallengesList';
import CustomChallengesItem from '../components/CustomChallengesItem';
import CustomChallengeForm from '../components/CustomChallengeForm';
import debouce from '../utility/debouce';

export default class ManageChallenges extends Component {
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
    const { props } = this;
    const { displayBtnUp, displayCustomChallengeForm } = props.manageChallenges;

    if (window.pageYOffset > 150
      && !displayBtnUp
      && !displayCustomChallengeForm) {
      props.showBtnUp();
    } else if ((window.pageYOffset < 150 && displayBtnUp)
      || (displayCustomChallengeForm && displayBtnUp)) {
      props.hideBtnUp();
    }
  }

  render() {
    const { props } = this;
    const { displayCustomChallengeForm } = props.manageChallenges;
    const customChallenges = props.challenges.data
      .filter(challenge => challenge.stage === 'Custom');
    const challengesList = (customChallenges.length !== 0)
      ? (<ChallengesList
        challenges={customChallenges}
        deleteChallenge={props.deleteChallenge}
        item={CustomChallengesItem}
      />)
      : <p className="manage-challenges__notice">{ 'You don\'t have any custom challenges.' }</p>;
    const customChallengeForm = (displayCustomChallengeForm)
      ? <CustomChallengeForm />
      : null;
    const btnUp = (props.manageChallenges.displayBtnUp)
      ? <BtnUp hideBtnUp={props.hideBtnUp} /> : null;

    return (
      <div className="manage-challenges">
        <Btn
          handleClick={props.toggleCustomChallengeForm}
          text={'Add challenge'}
        />
        { challengesList }
        { customChallengeForm }
        { btnUp }
      </div>
    );
  }
}

ManageChallenges.propTypes = {
  addChallenge: PropTypes.func,
  challenges: PropTypes.shape({
    data: PropTypes.array,
  }),
  createChallenge: PropTypes.func,
  deleteChallenge: PropTypes.func,
  hideBtnUp: PropTypes.func,
  manageChallenges: PropTypes.shape({
    displayBtnUp: PropTypes.bool,
    displayCustomChallengeForm: PropTypes.bool,
  }),
  showBtnUp: PropTypes.func,
  toggleCustomChallengeForm: PropTypes.func,
};

ManageChallenges.defaultProps = {
  addChallenge: () => {},
  challenges: {
    data: [],
  },
  createChallenge: () => {},
  deleteChallenge: () => {},
  hideBtnUp: () => {},
  manageChallenges: {
    displayBtnUp: false,
    displayChallengeForm: false,
  },
  showBtnUp: () => {},
  toggleCustomChallengeForm: () => {},
};
