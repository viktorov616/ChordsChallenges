import React, { PropTypes } from 'react';

import Btn from '../components/Btn';
import CustomChallengesList from '../components/CustomChallengesList';
import CustomChallengePopup from '../components/CustomChallengePopup';

export default function ManageChallenges(props) {
  const {
    challengeTypes, chords, displayCustomChallengePopup, noticeMessage,
  } = props.manageChallenges;
  const customChallenges = props.challenges.data.filter(challenge => challenge.stage === 'custom');
  const customChallengesList = (customChallenges.length !== 0)
    ? <CustomChallengesList challenges={customChallenges} />
    : <p className="manage-challenges__notice">{ 'You don\'t have any custom challenges.' }</p>;
  const customChallengePopup = (displayCustomChallengePopup)
    ? (<CustomChallengePopup
      challengeTypes={challengeTypes}
      challenges={props.challenges.data}
      chords={chords}
      createChallenge={props.createChallenge}
      noticeMessage={noticeMessage}
      setNoticeMessage={props.setNoticeMessage}
      toggleCustomChallengePopup={props.toggleCustomChallengePopup}
    />)
    : null;

  return (
    <div className="manage-challenges">
      <Btn
        handleClick={props.toggleCustomChallengePopup}
        text={'Add challenge'}
      />
      { customChallengesList }
      { customChallengePopup }
    </div>
  );
}

ManageChallenges.propTypes = {
  addChallenge: PropTypes.func,
  challenges: PropTypes.shape({
    data: PropTypes.array,
  }),
  createChallenge: PropTypes.func,
  manageChallenges: PropTypes.shape({
    displayCustomChallengePopup: PropTypes.bool,
    noticeMessage: PropTypes.string,
  }),
  setNoticeMessage: PropTypes.func,
  toggleCustomChallengePopup: PropTypes.func,
};

ManageChallenges.defaultProps = {
  addChallenge: () => {},
  challenges: {
    data: [],
  },
  createChallenge: () => {},
  displayChallengePopup: false,
  manageChallenges: {
    displayChallengePopup: false,
    noticeMessage: '',
  },
  setNoticeMessage: () => {},
  toggleCustomChallengePopup: () => {},
};
