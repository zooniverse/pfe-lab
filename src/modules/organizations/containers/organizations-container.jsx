import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { setOrganizationsCollaborator, setOrganizationsOwned } from '../action-creators';
import { organizationsShape } from '../model';
import ListOrganizations from '../components/list-organizations';

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganizations();
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizationsCollaborator([]));
    this.props.dispatch(setOrganizationsOwned([]));
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
              this.props.dispatch(setOrganizationsOwned(orgsWithAvatar));
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
              this.props.dispatch(setOrganizationsCollaborator(orgsWithOwner));
            });
        });
      });
  }

  render() {
    return (
      <ListOrganizations
        organizationsCollaborator={this.props.organizationsCollaborator}
        organizationsOwned={this.props.organizationsOwned}
      />
    );
  }
}

OrganizationsContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organizationsCollaborator: organizationsShape,
  organizationsOwned: organizationsShape,
};

function mapStateToProps(state) {
  return {
    organizationsCollaborator: state.organizationsCollaborator,
    organizationsOwned: state.organizationsOwned,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
