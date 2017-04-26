import React from 'react';
import { Router, Route, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';

import EditDetails from './components/edit-details';

import OrganizationContainer from './containers/organization-container';
import CollaboratorsContainer from './containers/collaborators-container';
import OrganizationsListContainer from './containers/organizations-list-container';
import ProjectsContainer from './containers/projects-container';

const organizationsRoutes = store => (
  <Provider store={store}>
    <Router>
      <Route path="/organizations">
        <IndexRoute component={OrganizationsListContainer} />
        <Route path=":id" component={OrganizationContainer}>
          <IndexRoute component={EditDetails} />
          <Route path="collaborators" component={CollaboratorsContainer} />
          <Route path="projects" component={ProjectsContainer} />
        </Route>
      </Route>
    </Router>
  </Provider>
);

export default organizationsRoutes;
