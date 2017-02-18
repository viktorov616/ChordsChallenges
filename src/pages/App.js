import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../actions/actionCreators';
import Layout from './Layout';

function mapStateToProps(state) {
  const { challenges, challenge, manageChallenges } = state;
  return {
    challenges,
    challenge,
    manageChallenges,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const app = connect(mapStateToProps, mapDispatchToProps)(Layout);

export default app;
