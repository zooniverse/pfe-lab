import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape } from '../model';
import { setCurrentOrganization } from '../action-creators';
import OrganizationLayout from '../components/organization-layout';

class OrganizationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchOrganization = this.fetchOrganization.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);
    this.updateOrganization = this.updateOrganization.bind(this);
  }

  componentDidMount() {
    this.fetchOrganization(this.props.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params && this.props.params && nextProps.params.id === this.props.params.id) return;
    this.fetchOrganization(nextProps.params.id);
  }

  componentWillUnmount() {
    this.props.dispatch(setCurrentOrganization(null));
  }

  updateOrganization(organizationFields) {
    this.props.organization.update(organizationFields).save()
      .then((updatedOrganization) => {
        this.props.dispatch(setCurrentOrganization(updatedOrganization));
      }).catch(error => console.error(error));
  }

  resetOrganization() {
    this.props.dispatch(setCurrentOrganization(this.props.organization));
  }

  fetchOrganization(id) { // eslint-disable-line class-methods-use-this
    if (!id) {
      return;
    }

    apiClient.type('organizations').get(id.toString())
      .then((org) => {
        this.props.dispatch(setCurrentOrganization(org));
      });
  }

  render() {
    const children = this.props.children; // eslint-disable-line react/prop-types
    const organization = this.props.organization;
    const organizationId = this.props.params.id;

    // inject props into children
    const wrappedChildren = React.Children.map(children, child =>
      React.cloneElement(child, {
        organization,
        organizationId,
        resetOrganization: this.resetOrganization,
        updateOrganization: this.updateOrganization,
      }),
    );

    return (
      <OrganizationLayout organizationId={organizationId}>
        {wrappedChildren}
      </OrganizationLayout>
    );
  }
}

OrganizationContainer.propTypes = {
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  params: React.PropTypes.shape({ id: React.PropTypes.string }),
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(OrganizationContainer);
