import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';

import { setCurrentOrganization, setOrganizations } from '../../common/actions/organizations';
import OrganizationsEditLayout from '../components/organizations-edit-layout';

// TODO: ARB: we shouldn't need this but organizations don't return otherwise
window.zooAPI = apiClient;
apiClient.params.admin = true;

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganization(props.params.id);
    this.fetchOrganizations();
    this.state = { client: apiClient };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params && this.props.params && nextProps.params.id === this.props.params.id) return;

    this.fetchOrganization(nextProps.params.id)
    this.fetchOrganizations();
  }

  fetchOrganizations() {
    apiClient.type('organizations').get().then((orgs) => {
      this.props.dispatch(setOrganizations(orgs));
    });
  }

  fetchOrganization(id) { // eslint-disable-line class-methods-use-this
    apiClient.type('organizations').get({ id }).then((org) => {
      this.props.dispatch(setCurrentOrganization(org[0]));
    });
  }

  render() {
    return (
      <OrganizationsEditLayout organization={this.props.organization} organizations={this.props.organizations}>
        {this.props.children}
      </OrganizationsEditLayout>
    );
  }
}

OrganizationsContainer.propTypes = {
  children: React.PropTypes.node,
  organization: React.PropTypes.object,
  organizations: React.PropTypes.array,
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizations: state.organizations,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
