import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape, organizationCollaboratorsShape, organizationOwnerShape } from '../model';
import { setOrganizationCollaborators, setOrganizationOwner } from '../action-creators';

import EditCollaborators from '../components/edit-collaborators';

class CollaboratorsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchOrganizationCollaborators();
    this.updateOrganizationCollaborator = this.updateOrganizationCollaborator.bind(this);
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizationCollaborators(null));
    this.props.dispatch(setOrganizationOwner(null));
  }

  updateOrganizationCollaborator() {
    // TODO add handler
  }

  fetchOrganizationCollaborators(organization = this.props.organization) { // eslint-disable-line class-methods-use-this
    if (!organization) {
      return;
    }

    organization.get('organization_roles', { page_size: 100 })
      .then((panoptesRoles) => {
        const collaborators = panoptesRoles.map((roleSet) => {
          const userFetch = apiClient.type('users').get(roleSet.links.owner.id, { fields: 'display_name,id' });

          if (roleSet.roles.includes('owner')) {
            userFetch.then((user) => {
              this.props.dispatch(setOrganizationOwner(user));
            });
          }
          userFetch.then((user) => {
            return { displayName: user.display_name, roles: roleSet.roles, id: user.id };
          });
        });
        this.props.dispatch(setOrganizationCollaborators(collaborators));
      }).catch((error) => { console.error(error); });
  }

  render() {
    const props = {
      organization: this.props.organization,
      organizationOwner: this.props.organizationOwner,
      organizationCollaborators: this.props.organizationCollaborators,
      updateOrganizationCollaborator: this.updateOrganizationCollaborator,
      user: this.props.user,
    };

    return (<EditCollaborators {...props} />);
  }
}

CollaboratorsContainer.propTypes = {
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
