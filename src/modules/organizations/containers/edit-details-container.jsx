import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import EditDetails from '../components/edit-details';
import { organizationShape, organizationAvatarShape, organizationBackgroundShape } from '../model';
import { setCurrentOrganization, setOrganizationAvatar, setOrganizationBackground } from '../action-creators';
import notificationHandler from '../../../lib/notificationHandler';

class EditDetailsContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchAvatar = this.fetchAvatar.bind(this);
    this.fetchBackground = this.fetchBackground.bind(this);
    this.handleMediaChange = this.handleMediaChange.bind(this);
  }

  componentDidMount() {
    if (this.props.organization) {
      this.fetchAvatar(this.props.organization);
      this.fetchBackground(this.props.organization);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.organization !== nextProps.organization) {
      this.fetchAvatar(nextProps.organization);
      this.fetchBackground(nextProps.organization);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setOrganizationAvatar({}));
    this.props.dispatch(setOrganizationBackground({}));
  }

  fetchAvatar(org) {
    if (org.links.avatar && org.links.avatar.id) {
      apiClient.type('avatars').get(org.links.avatar.id)
        .then((avatar) => {
          this.props.dispatch(setOrganizationAvatar(avatar));
        }).catch((error) => {
          if (error.status !== 404) {
            const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

            notificationHandler(this.props.dispatch, notification);
          }
        });
    }
  }

  fetchBackground(org) {
    if (org.links.background && org.links.background.id) {
      apiClient.type('backgrounds').get(org.links.background.id)
        .then((background) => {
          this.props.dispatch(setOrganizationBackground(background));
        }).catch((error) => {
          if (error.status !== 404) {
            const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

            notificationHandler(this.props.dispatch, notification);
          }
        });
    }
  }

  handleMediaChange(type, file) {
    apiClient.post(this.props.organization._getURL(type), { media: { content_type: file.type } })
      .then(([resource]) => {
        const headers = new Headers();
        const params = {
          method: 'PUT',
          headers: headers,
          mode: 'cors',
          body: file
        };

        fetch(resource.src, params)
          .then((response) => {
            if (response.ok) {
              this.refreshOrganization(type)
                .then(([organization]) => {
                  this.props.dispatch(setCurrentOrganization(organization));
                  if (type === 'avatar') {
                    this.fetchAvatar(organization);
                  }
                  if (type === 'background') {
                    this.fetchBackground(organization);
                  }
                });
            }
          }).catch((error) => {
            const notification = { status: 'critical', message: `${error.statusText}: ${error.message}` };

            notificationHandler(this.props.dispatch, notification);
          });
      });
  }

  refreshOrganization(resourceLinkToUncache) {
    this.props.organization.uncacheLink(resourceLinkToUncache);
    return this.props.organization.refresh();
  }

  render() {
    return (
      <EditDetails
        deleteOrganization={this.props.deleteOrganization}
        deletionInProgress={this.props.deletionInProgress}
        handleMediaChange={this.handleMediaChange}
        organization={this.props.organization}
        organizationAvatar={this.props.organizationAvatar}
        organizationBackground={this.props.organizationBackground}
        updateOrganization={this.props.updateOrganization}
      />
    );
  }
}

EditDetailsContainer.propTypes = {
  deleteOrganization: React.PropTypes.func.isRequired,
  deletionInProgress: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  organizationAvatar: organizationAvatarShape,
  organizationBackground: organizationBackgroundShape,
  updateOrganization: React.PropTypes.func.isRequired
};

EditDetailsContainer.defaultProps = {
  deleteOrganization: () => {},
  deletionInProgress: false,
  updateOrganization: () => {}
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationAvatar: state.organizationAvatar,
    organizationBackground: state.organizationBackground
  };
}

export default connect(mapStateToProps)(EditDetailsContainer);
