import React, { Component, PropTypes } from 'react';

import Btn from './Btn';

export default class CustomChallengePopup extends Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleSetNotice = this.handleSetNotice.bind(this);
  }

  handleCreate() {
    const chordsInputs = Array.from(this.chordsList.getElementsByTagName('input'));
    const selectedChords = chordsInputs.reduce((result, input) => (
      (input.checked) ? result.concat(input.value) : result
    ), []);
    const challengeType = this.typeSelect.selectedOptions[0].value;
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

    this.props.createChallenge(id, challengeType, selectedChords);
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
            <div className="custom-challenge-popup__select-wrapper">
              <select
                ref={(select) => { this.typeSelect = select; }}
                onClick={this.handleSetNotice}
                className="custom-challenge-popup__select"
              >
                { props.challengeTypes.map(type => <option
                  key={type}
                  value={type}
                >
                  { type }
                </option>) }
              </select>
            </div>
          </div>
          <div className="custom-challenge-popup__section">
            <h2 className="custom-challenge-popup__section-header">Choose chords.</h2>
            <ul
              ref={(chords) => { this.chordsList = chords; }}
              className="custom-challenge-popup__chords"
            >
              { props.chords.map(chord => <li
                key={`custom-${chord}`}
                className="custom-challenge-popup__chords-item"
              >
                <input
                  id={`custom-${chord}`}
                  type="checkbox"
                  onClick={this.handleSetNotice}
                  className="custom-challenge-popup__input"
                  value={chord}
                />
                <label
                  htmlFor={`custom-${chord}`}
                  className="custom-challenge-popup__label"
                >
                  { chord }
                </label>
              </li>)}
            </ul>
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
  noticeMessage: PropTypes.shape({
    mod: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  }).isRequired,
  setNoticeMessage: PropTypes.func.isRequired,
  toggleCustomChallengePopup: PropTypes.func.isRequired,
};
