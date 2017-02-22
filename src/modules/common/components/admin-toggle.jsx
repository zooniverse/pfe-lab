import React from 'react';
import apiClient from 'panoptes-client/lib/api-client';
import { connect } from 'react-redux';
import { setAdminMode } from '../action-creators';

class AdminToggle extends React.Component {
  constructor(props) {
    super(props);
    this.toggleAdminMode = this.toggleAdminMode.bind(this);
  }

  componentDidMount() {
    apiClient.update({
      'params.admin': !!localStorage.getItem('adminFlag') || undefined,
    });
  }

  toggleAdminMode() {
    this.props.dispatch(setAdminMode(!this.props.adminMode));
  }

  render() {
    return (
      <label htmlFor="adminMode">
        <input type="checkbox" checked={this.props.adminMode} onClick={this.toggleAdminMode} />{' '}
        Admin Mode
      </label>
    );
  }
}

AdminToggle.propTypes = {
  admin: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    adminMode: state.adminMode,
    user: state.user,
  };
}

export default connect(mapStateToProps)(AdminToggle);
