import React, { PropTypes } from 'react';

import Btn from '../components/Btn';
import ChallengesList from '../components/ChallengesList';
import CustomChallengesItem from '../components/CustomChallengesItem';
import CustomChallengeForm from '../components/CustomChallengeForm';

export default function ManageChallenges(props) {
  const { displayCustomChallengeForm } = props.manageChallenges;
  const customChallenges = props.challenges.data.filter(challenge => challenge.stage === 'Custom');
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

  return (
    <div className="manage-challenges">
      <Btn
        handleClick={props.toggleCustomChallengeForm}
        text={'Add challenge'}
      />
      { challengesList }
      { customChallengeForm }
    </div>
  );
}

ManageChallenges.propTypes = {
  addChallenge: PropTypes.func,
  challenges: PropTypes.shape({
    data: PropTypes.array,
  }),
  createChallenge: PropTypes.func,
  deleteChallenge: PropTypes.func,
  manageChallenges: PropTypes.shape({
    displayCustomChallengeForm: PropTypes.bool,
  }),
  toggleCustomChallengeForm: PropTypes.func,
};

ManageChallenges.defaultProps = {
  addChallenge: () => {},
  challenges: {
    data: [],
  },
  createChallenge: () => {},
  deleteChallenge: () => {},
  manageChallenges: {
    displayChallengeForm: false,
  },
  toggleCustomChallengeForm: () => {},
};
