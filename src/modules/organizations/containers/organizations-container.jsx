import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';

import { setOrganizations } from '../action-creators';
import { organizationShape, organizationsShape } from '../model';
import OrganizationsLayout from '../components/organizations-layout';

// TODO: ARB: we shouldn't need this but organizations don't return otherwise
apiClient.params.admin = true;

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganizations();
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizations([]));
  }

  fetchOrganizations() {
    apiClient.type('organizations').get().then((orgs) => {
      this.props.dispatch(setOrganizations(orgs));
    });
  }

  render() {
    return (
      <OrganizationsLayout organizations={this.props.organizations} organization={this.props.organization}>
        {this.props.children}
      </OrganizationsLayout>
    );
  }
}

OrganizationsContainer.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  organizations: organizationsShape,
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizations: state.organizations,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
