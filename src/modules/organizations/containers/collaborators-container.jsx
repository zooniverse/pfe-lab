import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape, organizationCollaboratorsShape, organizationOwnerShape } from '../model';
import { setOrganizationCollaborators, setOrganizationOwner } from '../action-creators';
import notificationHandler from '../../../lib/notificationHandler';

import EditCollaborators from '../components/edit-collaborators';
import CollaboratorCreatorContainer from './collaborator-creator-container';

const POSSIBLE_ROLES = {
  collaborator: 'admin',
  // scientist: 'scientist',
  // moderator: 'moderator',
  // tester: 'team',
};

const ROLES_INFO = {
  collaborator: {
    label: 'Collaborator',
    description: 'Collaborators have full access to edit organization content, including deleting the organization.',
  },
  // scientist: {
  //   label: 'Researcher',
  //   description: 'Members of the research team will be marked as researchers on "Talk"',
  // },
  // moderator: {
  //   label: 'Moderator',
  //   description: 'Moderators have extra privileges in the community discussion area to moderate discussions. They will also be marked as moderators on "Talk".',
  // },
  // tester: {
  //   label: 'Tester',
  //   description: 'Testers can view (TODO: view what?). They cannot access the organization builder.',
  // },
  // TODO: uncomment when we can translate
  // translator: {
  //   label: 'Translator',
  //   description: 'Translators will have access to the translation site.',
  // },
};

class CollaboratorsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: null,
    };

    this.addCollaborators = this.addCollaborators.bind(this);
    this.fetchCollaborators = this.fetchCollaborators.bind(this);
    this.refreshCollaborators = this.refreshCollaborators.bind(this);
    this.removeCollaborator = this.removeCollaborator.bind(this);
    this.saveCollaborators = this.saveCollaborators.bind(this);
    this.updateCollaborator = this.updateCollaborator.bind(this);
  }

  componentDidMount() {
    this.fetchCollaborators();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      this.fetchCollaborators(nextProps.organization);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizationCollaborators(null));
    this.props.dispatch(setOrganizationOwner(null));
  }

  addCollaborators(roles, users) {
    // TODO: add talk role creation when that is supported
    const newRoles = users.map(user =>
      apiClient.type('organization_roles').create({
        roles,
        links: {
          organization: this.props.organization.id,
          user,
        },
      })
    );

    return Promise.all(this.saveCollaborators(newRoles))
      .then(() => {
        this.refreshCollaborators();
      }).catch((error) => {
        const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

        notificationHandler(this.props.dispatch, notification);
      });
  }

  refreshCollaborators() {
    this.props.organization.uncacheLink('organization_roles');
    this.fetchCollaborators();
  }

  removeCollaborator(collaborator) {
    this.setState({ saving: collaborator.id });

    collaborator.delete().then(() => {
      this.refreshCollaborators();
    })
    .then(() => { this.setState({ saving: null }); })
    .catch((error) => {
      const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };
      notificationHandler(this.props.dispatch, notification);
    });
  }

  saveCollaborators(newRoles) {
    return newRoles.map(newRole => newRole.save());
  }

  updateCollaborator(collaborator, role, add) {
    // TODO add Talk roles when Talk is setup for organizations
    this.setState({ saving: collaborator.id });

    let newRoleSet;
    if (add) {
      collaborator.roles.push(role);
      newRoleSet = collaborator.roles;
    } else {
      const index = collaborator.roles.indexOf(role);
      collaborator.roles.splice(index, 1);
      newRoleSet = collaborator.roles;
    }

    collaborator.update({ 'roles': newRoleSet }).save()
      .then((updatedCollaborator) => {
        // Doing this doesn't maintain the array order, so reordering in UI happens on re-render and can be confusing...
        const updatedCollaborators = this.props.organizationCollaborators.filter(currentCollaborator => !(currentCollaborator === collaborator));
        updatedCollaborators.push(updatedCollaborator);
        this.props.dispatch(setOrganizationCollaborators(updatedCollaborators));
      }).then(() => {
        this.setState({ saving: null });
      })
      .catch((error) => {
        const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

        notificationHandler(this.props.dispatch, notification);
      });
  }

  fetchCollaborators(organization = this.props.organization) { // eslint-disable-line class-methods-use-this
    if (!organization) {
      return;
    }

    organization.get('organization_roles', { page_size: 100 })
      .then((panoptesRoles) => {
        const withoutOwnerRole = panoptesRoles.filter(roleSet => !roleSet.roles.includes('owner'));

        if (!this.props.organizationOwner) {
          const ownerRole = panoptesRoles.find(roleSet => roleSet.roles.includes('owner'));

          apiClient.type('users').get(ownerRole.links.owner.id)
            .then((owner) => { this.props.dispatch(setOrganizationOwner(owner)); })
            .catch((error) => {
              const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

              notificationHandler(this.props.dispatch, notification);
            });
        }

        // This is ugly. I've requested to get back display_name in the original request: https://github.com/zooniverse/Panoptes/issues/2123
        this.props.dispatch(setOrganizationCollaborators(withoutOwnerRole));
      });
  }

  render() {
    const props = {
      organization: this.props.organization,
      organizationOwner: this.props.organizationOwner,
      organizationCollaborators: this.props.organizationCollaborators,
      possibleRoles: POSSIBLE_ROLES,
      removeCollaborator: this.removeCollaborator,
      rolesInfo: ROLES_INFO,
      saving: this.state.saving,
      updateCollaborator: this.updateCollaborator,
      user: this.props.user,
    };

    return (
      <div>
        <EditCollaborators {...props} />
        <hr />
        <CollaboratorCreatorContainer
          addCollaborators={this.addCollaborators}
          possibleRoles={POSSIBLE_ROLES}
          rolesInfo={ROLES_INFO}
        />
      </div>
    );
  }
}

CollaboratorsContainer.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  organizationCollaborators: organizationCollaboratorsShape,
  organizationOwner: organizationOwnerShape,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationOwner: state.organizationOwner,
    organizationCollaborators: state.organizationCollaborators,
    user: state.user,
  };
}

export default connect(mapStateToProps)(CollaboratorsContainer);
