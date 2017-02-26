import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import App from './pages/App';
import Challenges from './pages/Challenges';
import Challenge from './pages/Challenge';
import ManageChallenges from './pages/ManageChallenges';

import store, { history } from './store';

import './style.scss';

const router = (
  <Provider store={store}>
    <Router history={history}>
      <Route path="/ChordsChallenges/" components={App}>
        <IndexRoute component={Challenges} />
        <Route path="/ChordsChallenges/challenge/:challengeId" component={Challenge} />
        <Route path="/ChordsChallenges/manage-challenges" component={ManageChallenges} />
      </Route>
    </Router>
  </Provider>
);

render(router, document.getElementById('root'));
