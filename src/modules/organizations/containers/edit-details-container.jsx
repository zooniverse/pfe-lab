import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import EditDetails from '../components/edit-details';
import { organizationShape, organizationAvatarShape, organizationBackgroundShape } from '../model';
import { setCurrentOrganization, setOrganizationAvatar, setOrganizationBackground } from '../action-creators';

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

  fetchAvatar(org) {
    apiClient.type('avatars').get(org.links.avatar.id)
      .then((avatar) => {
        this.props.dispatch(setOrganizationAvatar(avatar));
      }).catch((error) => {
        if (error.status !== 404) console.error(error);
      });;
  }

  fetchBackground(org) {
    apiClient.type('backgrounds').get(org.links.background.id)
      .then((background) => {
        this.props.dispatch(setOrganizationBackground(background));
      }).catch((error) => {
        if (error.status !== 404) console.error(error);
      });
  }

  handleMediaChange(type, file) {
    console.log('media change', type, file.type);
    apiClient.post(this.props.organization._getURL(type), { media: { content_type: file.type }})
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
              console.log('ok!')
              this.props.organization.uncacheLink(type);
              this.props.organization.refresh()
                .then((organization) => {
                  console.log('refreshed organization', organization)
                });
            }
          }).catch(e => console.error(e));
      }).catch(e => console.error(e));
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
}

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationAvatar: state.organizationAvatar,
    organizationBackground: state.organizationBackground
  };
}

export default connect(mapStateToProps)(EditDetailsContainer);
