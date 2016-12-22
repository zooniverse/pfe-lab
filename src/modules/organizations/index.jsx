import React from 'react';
import { Router, Route, IndexRoute, IndexRedirect } from 'react-router';
import { Provider } from 'react-redux';

import OrganizationsContainer from './containers/organizations-container';
import EditDetails from './components/edit-details';

const organizationsRoutes = store => (
  <Provider store={store}>
    <Router>
      <Route path="organizations/:id" component={OrganizationsContainer}>
        <IndexRoute component={EditDetails} />
      </Route>
    </Router>
  </Provider>
);

export default organizationsRoutes;
