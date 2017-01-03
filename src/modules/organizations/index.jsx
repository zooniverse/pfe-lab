import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import OrganizationsContainer from './containers/organizations-container';
import EditDetails from './components/edit-details';
import ListOrganizations from './components/list-organizations';

const organizationsRoutes = store => (
  <Provider store={store}>
    <Router>
      <Route path="/organizations" component={OrganizationsContainer}>
        <Route path=":id" component={EditDetails} />
        <IndexRoute component={ListOrganizations} />
      </Route>
    </Router>
  </Provider>
);

export default organizationsRoutes;
