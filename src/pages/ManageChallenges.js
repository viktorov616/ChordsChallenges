import React, { PropTypes } from 'react';

import Btn from '../components/Btn';
import ChallengesList from '../components/ChallengesList';
import CustomChallengesItem from '../components/CustomChallengesItem';
import CustomChallengePopup from '../components/CustomChallengePopup';

export default function ManageChallenges(props) {
  const {
    challengeTypes, chords, displayCustomChallengePopup, noticeMessage, selectedChords,
    selectedType,
  } = props.manageChallenges;
  const customChallenges = props.challenges.data.filter(challenge => challenge.stage === 'Custom');
  const challengesList = (customChallenges.length !== 0)
    ? (<ChallengesList
      challenges={customChallenges}
      deleteChallenge={props.deleteChallenge}
      item={CustomChallengesItem}
    />)
    : <p className="manage-challenges__notice">{ 'You don\'t have any custom challenges.' }</p>;
  const customChallengePopup = (displayCustomChallengePopup)
    ? (<CustomChallengePopup
      challengeTypes={challengeTypes}
      challenges={props.challenges.data}
      chords={chords}
      createChallenge={props.createChallenge}
      handleCheckboxActivated={props.customChallengeCheckboxActivated}
      handleCheckboxDeactivated={props.customChallengeCheckboxDeactivated}
      handleClearCheckboxes={props.clearCustomChallengeCheckboxesValues}
      noticeMessage={noticeMessage}
      selectedChords={selectedChords}
      selectedType={selectedType}
      setNoticeMessage={props.setNoticeMessage}
      toggleCustomChallengePopup={props.toggleCustomChallengePopup}
      updateCustomChallengePopup={props.updateCustomChallengePopup}
    />)
    : null;

  return (
    <div className="manage-challenges">
      <Btn
        handleClick={props.toggleCustomChallengePopup}
        text={'Add challenge'}
      />
      { challengesList }
      { customChallengePopup }
    </div>
  );
}

ManageChallenges.propTypes = {
  addChallenge: PropTypes.func,
  challenges: PropTypes.shape({
    data: PropTypes.array,
  }),
  clearCustomChallengeCheckboxesValues: PropTypes.func,
  createChallenge: PropTypes.func,
  customChallengeCheckboxActivated: PropTypes.func,
  customChallengeCheckboxDeactivated: PropTypes.func,
  deleteChallenge: PropTypes.func,
  manageChallenges: PropTypes.shape({
    displayCustomChallengePopup: PropTypes.bool,
    noticeMessage: PropTypes.object,
  }),
  selectedChords: PropTypes.array,
  selectedType: PropTypes.string,
  setNoticeMessage: PropTypes.func,
  toggleCustomChallengePopup: PropTypes.func,
  updateCustomChallengePopup: PropTypes.func,
};

ManageChallenges.defaultProps = {
  addChallenge: () => {},
  challenges: {
    data: [],
  },
  clearCustomChallengeCheckboxesValues: () => {},
  createChallenge: () => {},
  customChallengeCheckboxActivated: () => {},
  customChallengeCheckboxDeactivated: () => {},
  deleteChallenge: () => {},
  manageChallenges: {
    displayChallengePopup: false,
    noticeMessage: {},
  },
  selectedChords: [],
  selectedType: '',
  setNoticeMessage: () => {},
  toggleCustomChallengePopup: () => {},
  updateCustomChallengePopup: () => {},
};
