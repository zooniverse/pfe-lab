import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';

import { setCurrentOrganization, setOrganizations } from '../../common/actions/organizations';
import OrganizationsLayout from '../components/organizations-layout';

// TODO: ARB: we shouldn't need this but organizations don't return otherwise
apiClient.params.admin = true;
window.zooAPI = apiClient;

class OrganizationsContainer extends React.Component {
  constructor(props) {
    super(props);
    this.fetchOrganizations();
    this.state = { client: apiClient };
  }

  fetchOrganizations() {
    apiClient.type('organizations').get().then((orgs) => {
      this.props.dispatch(setOrganizations(orgs));
    });
  }

  render() {
    return (
      <OrganizationsLayout organizations={this.props.organizations}>
        {this.props.children}
      </OrganizationsLayout>
    );
  }
}

OrganizationsContainer.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
  params: React.PropTypes.shape({ id: React.PropTypes.string }),
  organizations: React.PropTypes.arrayOf(React.PropTypes.shape({ id: React.PropTypes.string })),
};

function mapStateToProps(state) {
  return {
    organizations: state.organizations,
  };
}

export default connect(mapStateToProps)(OrganizationsContainer);
