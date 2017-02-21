import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory, Route, Router } from 'react-router';
import { Provider } from 'react-redux';
import oauth from 'panoptes-client/lib/oauth';
import apiClient from 'panoptes-client/lib/api-client';

import App from './modules/common/containers/App';

import organizationsRoutes from './modules/organizations';

import { config } from './constants/config';
import configureStore from './store';
import initialState from './initial-state';

import StyleGuide from './modules/common/components/style-guide';

// Todo: let's find a better way to include Styles,
// currently Styles looks like an unused var to eslint
import Styles from './styles/main.styl'; // eslint-disable-line no-unused-vars

const store = configureStore(initialState);

window.React = React;

// We should use react-router-scroll middleware instead of onUpdate handler
// But lib still depends on history v3
oauth.init(config.panoptesAppId)
  .then(() => {
    ReactDOM.render((
      <Provider store={store}>
        <Router history={browserHistory} onUpdate={() => window.scrollTo(0, 0)}>
          <Route path="/" component={App} >
            {organizationsRoutes(store)}
          </Route>
          <Route path="style-guide" component={StyleGuide} />
        </Router>
      </Provider>),
      document.getElementById('root'),
    );
  });


// Just for console access:
window.zooAPI = apiClient;
