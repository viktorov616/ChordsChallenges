import React, { Component, PropTypes } from 'react';

import Btn from './Btn';
import Checkbox from './Checkbox';
import Select from './Select';

export default class CustomChallengePopup extends Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleSetNotice = this.handleSetNotice.bind(this);
  }

  componentWillUnmount() {
    this.props.handleClearCheckboxes('selectedChords');
    this.handleSetNotice();
  }

  handleCreate() {
    const { selectedChords, selectedType } = this.props;
    const id = `${this.props.challenges.length + 1}`;
    let noticeMessage;
    let noticeMod;

    if (selectedChords.length < 2) {
      noticeMessage = 'You must select at least 2 chords.';
      noticeMod = 'fail';

      this.props.setNoticeMessage(noticeMessage, noticeMod);
      return;
    }

    noticeMessage = 'Challenge created.';
    noticeMod = 'success';

    this.props.createChallenge(id, selectedType, selectedChords);
    this.props.setNoticeMessage(noticeMessage, noticeMod);
  }

  handleSetNotice() {
    this.props.setNoticeMessage();
  }

  render() {
    const { props } = this;
    const { noticeMessage } = props;
    const noticeMessageClass = 'custom-challenge-popup__notice';
    const noticeMessageClassModed = (noticeMessage.mod.length === 0)
      ? noticeMessageClass
      : `${noticeMessageClass} ${noticeMessageClass}--${noticeMessage.mod}`;
    const notice = (noticeMessage.value.length !== 0)
     ? <p className={noticeMessageClassModed}>{ noticeMessage.value }</p>
     : null;

    return (
      <div className="custom-challenge-popup">
        <div className="custom-challenge-popup__content">
          <h1 className="custom-challenge-popup__header">Create challenge</h1>
          <div className="custom-challenge-popup__section">
            <h2 className="custom-challenge-popup__section-header">Choose challenge type.</h2>
            <Select
              handleChange={this.props.updateCustomChallengePopup}
              handleClick={this.handleSetNotice}
              name={'selectedType'}
              options={props.challengeTypes}
            />
          </div>
          <div className="custom-challenge-popup__section">
            <h2 className="custom-challenge-popup__section-header">Choose chords.</h2>
            <div className="custom-challenge-popup__chords">
              { props.chords.map(chord => <Checkbox
                key={`custom-${chord}`}
                handleCheckboxActivated={props.handleCheckboxActivated}
                handleCheckboxDeactivated={props.handleCheckboxDeactivated}
                handleClick={this.handleSetNotice}
                groupName={'selectedChords'}
                id={`custom-${chord}`}
                value={chord}
              />)}
            </div>
          </div>
          <Btn
            handleClick={this.handleCreate}
            text={'Create'}
            mods={['big', 'no-margin']}
          />
          <div className="custom-challenge-popup__notice-wrapper">
            { notice }
          </div>
          <svg
            className="custom-challenge-popup__btn-close"
            width="25" height="25"
            onClick={props.toggleCustomChallengePopup}
          >
            <use xlinkHref="#icon-cross" />
          </svg>
        </div>
      </div>
    );
  }
}

CustomChallengePopup.propTypes = {
  challengeTypes: PropTypes.array.isRequired,
  challenges: PropTypes.array.isRequired,
  chords: PropTypes.array.isRequired,
  createChallenge: PropTypes.func.isRequired,
  handleCheckboxActivated: PropTypes.func.isRequired,
  handleCheckboxDeactivated: PropTypes.func.isRequired,
  handleClearCheckboxes: PropTypes.func.isRequired,
  noticeMessage: PropTypes.shape({
    mod: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  selectedChords: PropTypes.array.isRequired,
  selectedType: PropTypes.string.isRequired,
  setNoticeMessage: PropTypes.func.isRequired,
  toggleCustomChallengePopup: PropTypes.func.isRequired,
  updateCustomChallengePopup: PropTypes.func.isRequired,
};
