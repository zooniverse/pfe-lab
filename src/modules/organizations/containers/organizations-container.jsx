import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { setCollaboratedOrganizations, setOwnedOrganizations } from '../action-creators';
import { organizationsShape } from '../model';
import OrganizationsList from '../components/organizations-list';

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganizations();
  }

  componentWillUnmount() {
    this.props.dispatch(setCollaboratedOrganizations([]));
    this.props.dispatch(setOwnedOrganizations([]));
  }

  fetchOrganizations() {
    apiClient.type('organizations').get({
      sort: 'display_name',
      current_user_roles: ['owner'],
      include: 'avatar',
    })
      .then((orgs) => {
        const orgsWithAvatar = [];
        orgs.forEach((org) => {
          org.get('avatar')
            .then((avatar) => {
              const orgWithAvatar = Object.assign(org, { avatar });
              orgsWithAvatar.push(orgWithAvatar);
              this.props.dispatch(setOwnedOrganizations(orgsWithAvatar));
            });
        });
      });

    apiClient.type('organizations').get({
      sort: 'display_name',
      current_user_roles: ['collaborator'],
      include: 'organization_roles',
    })
      .then((orgs) => {
        const orgsWithOwner = [];
        orgs.forEach((org) => {
          org.get('organization_roles')
            .then((panoptesRoles) => {
              const ownerRole = panoptesRoles.find(roleSet => roleSet.roles.includes('owner'));
              const orgWithOwner = Object.assign(org, { ownerRole });
              orgsWithOwner.push(orgWithOwner);
              this.props.dispatch(setCollaboratedOrganizations(orgsWithOwner));
            });
        });
      });
  }

  render() {
    return (
      <OrganizationsList
        collaboratedOrganizations={this.props.collaboratedOrganizations}
        ownedOrganizations={this.props.ownedOrganizations}
      />
    );
  }
}

OrganizationsContainer.propTypes = {
  dispatch: React.PropTypes.func,
  collaboratedOrganizations: organizationsShape,
  ownedOrganizations: organizationsShape,
};

function mapStateToProps(state) {
  return {
    collaboratedOrganizations: state.collaboratedOrganizations,
    ownedOrganizations: state.ownedOrganizations,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
