import React, { Component, PropTypes } from 'react';

import Btn from './Btn';

export default class CustomChallengePopup extends Component {
  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
  }

  handleCreate() {
    const chordsInputs = Array.from(this.chordsList.getElementsByTagName('input'));
    const selectedChords = chordsInputs.reduce((result, input) => (
      (input.checked) ? result.concat(input.value) : result
    ), []);
    const challengeType = this.typeSelect.selectedOptions[0].value;
    const id = `${this.props.challenges.length + 1}`;

    if (selectedChords.length < 2) {
      const noticeMessage = 'You must select at least 2 chords.';

      this.props.setNoticeMessage(noticeMessage);
      return;
    }

    this.props.setNoticeMessage('');
    this.props.createChallenge(id, challengeType, selectedChords);
  }

  render() {
    const { props } = this;
    const { noticeMessage } = props;
    const notice = (noticeMessage.length !== 0)
     ? <p className="custom-challenge-popup__notice">{ noticeMessage }</p>
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
  noticeMessage: PropTypes.string.isRequired,
  setNoticeMessage: PropTypes.func.isRequired,
  toggleCustomChallengePopup: PropTypes.func.isRequired,
};
