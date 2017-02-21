import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { setOwnedOrganizations, setCollaboratorOrganizations } from '../action-creators';
import { organizationsShape } from '../model';
import ListOrganizations from '../components/list-organizations';

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganizations();
  }

  componentWillUnmount() {
    this.props.dispatch(setOwnedOrganizations([]));
    this.props.dispatch(setCollaboratorOrganizations([]));
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
              this.props.dispatch(setCollaboratorOrganizations(orgsWithOwner));
            });
        });
      });
  }

  render() {
    return (
      <ListOrganizations
        ownedOrganizations={this.props.ownedOrganizations}
        collaboratorOrganizations={this.props.collaboratorOrganizations}
      />
    );
  }
}

OrganizationsContainer.propTypes = {
  dispatch: React.PropTypes.func,
  ownedOrganizations: organizationsShape,
  collaboratorOrganizations: organizationsShape,
};

function mapStateToProps(state) {
  return {
    ownedOrganizations: state.ownedOrganizations,
    collaboratorOrganizations: state.collaboratorOrganizations,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
