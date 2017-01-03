import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';

// import { setCurrentOrganization } from '../actions/organizations'
import { setCurrentOrganization } from '../../common/actions/organizations';
import OrganizationsEditLayout from '../components/organizations-edit-layout';

// TODO: ARB: we shouldn't need this but organizations don't return otherwise
apiClient.params.admin = true;

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganization(props.params.id);
    this.state = { client: apiClient };
  }

  componentWillReceiveProps(nextProps) {
    this.fetchOrganization(nextProps.params.id)
  }

  fetchOrganization(id) { // eslint-disable-line class-methods-use-this
    apiClient.type('organizations').get({ id }).then((org) => {
      this.props.dispatch(setCurrentOrganization(org[0]));
    });
  }

  render() {
    return (
      <OrganizationsEditLayout organization={this.props.organization}>
        {this.props.children}
      </OrganizationsEditLayout>
    );
  }
}

OrganizationsContainer.propTypes = {
  children: React.PropTypes.node,
  organization: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
