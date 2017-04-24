import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { setCollaboratedOrganizations, setOwnedOrganizations } from '../action-creators';
import { organizationsShape } from '../model';
import OrganizationsList from '../components/organizations-list';

class OrganizationsListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchOrganizations = this.fetchOrganizations.bind(this);
  }

  componentDidMount() {
    this.fetchOrganizations();
  }

  componentWillUnmount() {
    this.props.dispatch(setCollaboratedOrganizations([]));
    this.props.dispatch(setOwnedOrganizations([]));
  }

  fetchOrganizations() {
    const fetchOwnedOrganizations =
      apiClient.type('organizations').get({
        sort: 'display_name',
        current_user_roles: ['owner'],
        include: 'avatar',
      });

    const fetchCollaboratedOrganizations =
      apiClient.type('organizations').get({
        sort: 'display_name',
        current_user_roles: ['collaborator'],
      });

    Promise.all([fetchOwnedOrganizations, fetchCollaboratedOrganizations])
      .then(([ownedOrganizations, collaboratedOrganizations]) => {
        const orgsWithAvatar = [];
        ownedOrganizations.forEach((ownedOrg) => {
          this.fetchLinkedAvatar(ownedOrg)
            .then((avatar) => {
              const orgWithAvatar = Object.assign(ownedOrg, { avatar });
              orgsWithAvatar.push(orgWithAvatar);
              this.props.dispatch(setOwnedOrganizations(orgsWithAvatar));
            });
        });

        this.props.dispatch(setCollaboratedOrganizations(collaboratedOrganizations));
      });
  }

  fetchLinkedAvatar(organization) {
    return apiClient.type('avatars').get(organization.links.avatar.id)
      .then((avatar) => { return avatar; })
      .catch(error => console.error(error));
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

OrganizationsListContainer.propTypes = {
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

export default connect(mapStateToProps)(OrganizationsListContainer);
