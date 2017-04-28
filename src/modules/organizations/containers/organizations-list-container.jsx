import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { setCollaboratedOrganizations, setOrganizationsAvatars, setOwnedOrganizations } from '../action-creators';
import { organizationsAvatarsShape, organizationsShape } from '../model';
import OrganizationsList from '../components/organizations-list';

class OrganizationsListContainer extends React.Component {
  constructor(props) {
    super(props);

    this.createOrganization = this.createOrganization.bind(this);
    this.fetchOrganizations = this.fetchOrganizations.bind(this);
  }

  componentDidMount() {
    this.fetchOrganizations();
  }

  componentWillUnmount() {
    this.props.dispatch(setCollaboratedOrganizations([]));
    this.props.dispatch(setOwnedOrganizations([]));
    this.props.dispatch(setOrganizationsAvatars([]));
  }

  fetchOrganizations() {
    // TODO pagination
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
        const orgsWithAvatar = ownedOrganizations.filter(ownedOrg => ownedOrg.links.avatar && ownedOrg.links.avatar.id);
        const avatarIds = orgsWithAvatar.map(org => org.links.avatar.id);

        this.fetchLinkedAvatar(avatarIds)
          .then((organizationsAvatars) => {
            this.props.dispatch(setOrganizationsAvatars(organizationsAvatars));
          });

        this.props.dispatch(setCollaboratedOrganizations(collaboratedOrganizations));
        this.props.dispatch(setOwnedOrganizations(ownedOrganizations));
      });
  }

  fetchLinkedAvatar(avatarIds) {
    return apiClient.type('avatars').get(avatarIds)
      .then((avatar) => { return avatar; })
      .catch((error) => {
        if (error.status !== 404) console.error(error);
      });
  }

  createOrganization() {
    // TODO We shouldn't be setting the title.
    const date = new Date().toLocaleString;
    const name = `Untitled organization ${date}`;
    apiClient.type('organizations').create({
      description: 'Lorem Ipsum',
      display_name: name,
      primary_language: navigator.language,
      title: name
    })
    .save()
    .then((organization) => { this.props.router.push(`/organizations/${organization.id}`); })
    .catch(error => console.error(error));
  }

  render() {
    return (
      <OrganizationsList
        createOrganization={this.createOrganization}
        collaboratedOrganizations={this.props.collaboratedOrganizations}
        organizationsAvatars={this.props.organizationsAvatars}
        ownedOrganizations={this.props.ownedOrganizations}
      />
    );
  }
}

OrganizationsListContainer.propTypes = {
  dispatch: React.PropTypes.func,
  collaboratedOrganizations: organizationsShape,
  organizationsAvatars: organizationsAvatarsShape,
  ownedOrganizations: organizationsShape,
  router: React.PropTypes.shape({
    push: React.PropTypes.func
  })
};

function mapStateToProps(state) {
  return {
    collaboratedOrganizations: state.collaboratedOrganizations,
    organizationsAvatars: state.organizationsAvatars,
    ownedOrganizations: state.ownedOrganizations,
  };
}

export default connect(mapStateToProps)(OrganizationsListContainer);
