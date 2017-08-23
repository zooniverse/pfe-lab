import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { AdminCheckbox } from 'zooniverse-react-components';
import apiClient from 'panoptes-client/lib/api-client';
import { setAdminMode } from '../action-creators';

export class AdminContainer extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAdminMode = this.toggleAdminMode.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('adminFlag') && !this.props.adminMode) {
      this.props.dispatch(setAdminMode(!this.props.adminMode));
      apiClient.update({
        'params.admin': localStorage.getItem('adminFlag'),
      });
    }
  }

  toggleAdminMode(e) {
    apiClient.update({
      'params.admin': e.target.checked || undefined,
    });

    if (e.target.checked) {
      localStorage.setItem('adminFlag', true);
    } else {
      localStorage.removeItem('adminFlag');
    }
    this.props.dispatch(setAdminMode(!this.props.adminMode));
  }

  render() {
    if (this.props.loginInitialized && this.props.user && this.props.user.admin) {
      return <AdminCheckbox user={this.props.user} onChange={this.toggleAdminMode} checked={this.props.adminMode} />;
    }

    return null;
  }

}

AdminContainer.defaultProps = {
  admin: false,
  adminMode: false,
  loginInitialized: false,
  user: null,
};

AdminContainer.propTypes = {
  admin: PropTypes.bool,
  adminMode: PropTypes.bool,
  loginInitialized: PropTypes.bool,
  user: React.PropTypes.shape({ id: React.PropTypes.string }),
};

function mapStateToProps(state) {
  return {
    admin: state.admin,
    adminMode: state.adminMode,
    loginInitialized: state.initialized,
    user: state.user,
  };
}

export default connect(mapStateToProps)(AdminContainer);
