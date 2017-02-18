import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import challenges from './challenges';
import challenge from './challenge';
import manageChallenges from './manageChallenges';

const rootReducer = combineReducers({
  challenges,
  challenge,
  manageChallenges,
  routing: routerReducer,
});

export default rootReducer;
