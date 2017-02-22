import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import challenges from './challenges';
import challenge from './challenge';
import customChallengeForm from './customChallengeForm';
import manageChallenges from './manageChallenges';

const rootReducer = combineReducers({
  challenges,
  challenge,
  customChallengeForm,
  manageChallenges,
  routing: routerReducer,
});

export default rootReducer;
