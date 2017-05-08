import React from 'react';
import { connect } from 'react-redux';

// import apiClient from 'panoptes-client/lib/api-client';
import { organizationShape } from '../model';

import EditAbout from '../components/edit-about';

class AboutContainer extends React.Component {

  render() {
    return (
      <div>
        <EditAbout />
      </div>
    );
  }
}

AboutContainer.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
  organization: organizationShape,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
  }),
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    user: state.user,
  };
}

export default connect(mapStateToProps)(AboutContainer);
