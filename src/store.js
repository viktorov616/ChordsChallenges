import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import rootReducer from './reducers/index';

const loggerMiddleware = createLogger();
const enhancers = compose(
  applyMiddleware(loggerMiddleware),
  (window.devToolsExtension) ? window.devToolsExtension() : f => f,
);
const defaultState = {};
const store = createStore(rootReducer, defaultState, enhancers);
export const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  module.hot.accept('./reducers/', () => {
    const nextRootReducer = require('./reducers/index').default;
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
