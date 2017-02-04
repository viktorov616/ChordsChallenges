import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import challenges from './challenges';
import challenge from './challenge';

const rootReducer = combineReducers({
  challenges,
  challenge,
  routing: routerReducer,
});

export default rootReducer;
