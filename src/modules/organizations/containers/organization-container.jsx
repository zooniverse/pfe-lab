import React from 'react';
import { connect } from 'react-redux';

import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape } from '../model';
import { setCurrentOrganization } from '../action-creators';

class OrganizationContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchOrganization(props.params.id);
    this.updateOrganization = this.updateOrganization.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params && this.props.params && nextProps.params.id === this.props.params.id) return;

    this.fetchOrganization(nextProps.params.id);
  }

  componentWillUnmount() {
    this.props.dispatch(setCurrentOrganization(null));
  }

  updateOrganization(organizationFields) {
    organizationFields.name = organizationFields.display_name; // eslint-disable-line no-param-reassign
    this.props.organization.update(organizationFields).save().then((result) => {
      this.props.dispatch(setCurrentOrganization(result));
    });
  }

  fetchOrganization(id) { // eslint-disable-line class-methods-use-this
    if (!id) {
      return;
    }

    apiClient.type('organizations').get(id.toString())
      .then((org) => {
        this.props.dispatch(setCurrentOrganization(org));
      }).catch((error) => { console.error(error); });
  }

  render() {
    const children = this.props.children; // eslint-disable-line react/prop-types
    const organization = this.props.organization;
    const organizationId = this.props.params.id;

    // inject props into children
    const wrappedChildren = React.Children.map(children, child =>
      React.cloneElement(child, { organization, organizationId, updateOrganization: this.updateOrganization }),
    );

    return (<div> {wrappedChildren} </div>);
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
