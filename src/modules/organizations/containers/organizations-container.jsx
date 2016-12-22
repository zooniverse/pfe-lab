import React from 'react';
import { connect } from 'react-redux';

import OrganizationsEditLayout from '../components/organizations-edit-layout';

class OrganizationsContainer extends React.Component {
  constructor() {
    super();
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
