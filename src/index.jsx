import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import oauth from 'panoptes-client/lib/oauth';

import App from './modules/common/containers/App';

import organizationsRoutes from './modules/organizations';

import { config } from './constants/config';
import configureStore from './store';
import initialState from './initial-state';
import favicon from './images/favicon.ico';

import 'grommet/scss/vanilla/index.scss'; // eslint-disable-line import/first
import './styles/main.styl'; // eslint-disable-line no-unused-vars

function removeHash() {
  window.history.pushState(
    '',
    document.title,
    window.location.pathname + window.location.search
  );
}

const store = configureStore(initialState);

// We should use react-router-scroll middleware instead of onUpdate handler
// But lib still depends on history v3
oauth.init(config.panoptesAppId, { customRedirects: true })
  .then(() => {
    ReactDOM.render((
      <Provider store={store}>
        <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
          <Route path="/" component={App} >
            {organizationsRoutes(store)}
          </Route>
        </Router>
      </Provider>
    ),
    document.getElementById('root'));
    removeHash();
  });
