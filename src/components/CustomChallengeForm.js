import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';

import Btn from './Btn';
import Checkbox from './Checkbox';
import Select from './Select';
import Form from './Form';

class CustomChallengeForm extends Component {
  static handleSubmit(e) {
    e.preventDefault();

    e.target.reset();
  }

  constructor(props) {
    super(props);

    this.handleCreate = this.handleCreate.bind(this);
    this.handleSetNotice = this.handleSetNotice.bind(this);
  }

  componentWillUnmount() {
    this.handleSetNotice();
  }

  handleCreate() {
    const { props } = this;
    const { selectedChords, selectedType } = props.customChallengeForm;
    const id = `${props.challenges.data.length + 1}`;
    let noticeMessage;
    let noticeMod;

    if (selectedChords.length < 2) {
      noticeMessage = 'You must select at least 2 chords.';
      noticeMod = 'fail';

      props.setNoticeMessage(noticeMessage, noticeMod);
      return;
    }

    noticeMessage = 'Challenge created.';
    noticeMod = 'success';

    props.createChallenge(id, selectedType, selectedChords);
    props.setNoticeMessage(noticeMessage, noticeMod);
    props.clearCustomChallengeCheckboxesValues('selectedChords');
  }

  handleSetNotice() {
    this.props.setNoticeMessage();
  }

  render() {
    const { props } = this;
    const { challengeTypes, chords, noticeMessage } = props.customChallengeForm;
    const noticeMessageClass = 'custom-challenge-form__notice';
    const noticeMessageClassModed = (noticeMessage.mod.length === 0)
      ? noticeMessageClass
      : `${noticeMessageClass} ${noticeMessageClass}--${noticeMessage.mod}`;
    const notice = (noticeMessage.value.length !== 0)
     ? <p className={noticeMessageClassModed}>{ noticeMessage.value }</p>
     : null;

    return (
      <Form
        className={'custom-challenge-form'}
        handleSubmit={this.constructor.handleSubmit}
        toggleForm={props.toggleCustomChallengeForm}
      >
        <h1 className="custom-challenge-form__header">Create challenge</h1>
        <div className="custom-challenge-form__section">
          <h2 className="custom-challenge-form__section-header">Choose challenge type.</h2>
          <Select
            handleChange={props.updateCustomChallengeForm}
            handleClick={this.handleSetNotice}
            name={'selectedType'}
            options={challengeTypes}
          />
        </div>
        <div className="custom-challenge-form__section">
          <h2 className="custom-challenge-form__section-header">Choose chords.</h2>
          <div className="custom-challenge-form__chords">
            { chords.map(chord => <Checkbox
              key={`custom-${chord}`}
              handleCheckboxActivated={props.customChallengeCheckboxActivated}
              handleCheckboxDeactivated={props.customChallengeCheckboxDeactivated}
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
        <div className="custom-challenge-form__notice-wrapper">
          { notice }
        </div>
      </Form>
    );
  }
}

CustomChallengeForm.propTypes = {
  challenges: PropTypes.shape({
    data: PropTypes.array.isRequired,
  }).isRequired,
  clearCustomChallengeCheckboxesValues: PropTypes.func.isRequired,
  customChallengeForm: PropTypes.shape({
    challengeTypes: PropTypes.array.isRequired,
    chords: PropTypes.array.isRequired,
    noticeMessage: PropTypes.object.isRequired,
    selectedChords: PropTypes.array.isRequired,
    selectedType: PropTypes.string.isRequired,
  }).isRequired,
  customChallengeCheckboxActivated: PropTypes.func.isRequired,
  customChallengeCheckboxDeactivated: PropTypes.func.isRequired,
  setNoticeMessage: PropTypes.func.isRequired,
  toggleCustomChallengeForm: PropTypes.func.isRequired,
  updateCustomChallengeForm: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const { challenges, customChallengeForm } = state;

  return {
    challenges,
    customChallengeForm,
  };
}

function mapDispatchProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const customChallengeForm = connect(mapStateToProps, mapDispatchProps)(CustomChallengeForm);

export default customChallengeForm;
