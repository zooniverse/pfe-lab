import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { setOrganizations, setOrganizationRoles } from '../action-creators';
import { organizationsShape } from '../model';
import ListOrganizations from '../components/list-organizations';

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganizations();
    this.fetchOrganizationRoles();
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizations([]));
    this.props.dispatch(setOrganizationRoles([]));
  }

  fetchOrganizations() {
    apiClient.type('organizations').get({ sort: 'display_name' }).then((orgs) => {
      this.props.dispatch(setOrganizations(orgs));
    });
  }

  fetchOrganizationRoles() {
    apiClient.type('organization_roles').get({ user_id: this.props.user.id }).then((orgRoles) => {
      this.props.dispatch(setOrganizationRoles(orgRoles));
    });
  }

  render() {
    return (
      <ListOrganizations organizations={this.props.organizations} organizationRoles={this.props.organizationRoles} />
    );
  }
}

OrganizationsContainer.propTypes = {
  dispatch: React.PropTypes.func,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
  organizations: organizationsShape,
  organizationRoles: React.PropTypes.arrayOf(React.PropTypes.object),
};

function mapStateToProps(state) {
  return {
    user: state.user,
    organizations: state.organizations,
    organizationRoles: state.organizationRoles,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
