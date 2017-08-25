import React from 'react';
import { connect } from 'react-redux';
import { AdminCheckbox } from 'zooniverse-react-components';
import apiClient from 'panoptes-client/lib/api-client';
import { setAdminMode } from '../action-creators';

export class AdminContainer extends React.Component {
  constructor(props) {
    super(props);

    this.setAdminState = this.setAdminState.bind(this);
    this.toggleAdminMode = this.toggleAdminMode.bind(this);
  }

  componentDidMount() {
    const isAdmin = !!localStorage.getItem('adminFlag');
    if (isAdmin) {
      this.setAdminState(isAdmin);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.adminMode !== this.props.adminMode) {
      this.setAdminState(nextProps.adminMode);
    }
  }

  setAdminState(isAdmin) {
    apiClient.update({
      'params.admin': isAdmin || undefined,
    });

    if (isAdmin) {
      localStorage.setItem('adminFlag', true);
    } else {
      localStorage.removeItem('adminFlag');
    }

    this.props.dispatch(setAdminMode(isAdmin));
  }

  toggleAdminMode(e) {
    const isAdmin = e.target.checked;
    this.setAdminState(isAdmin);
  }

  render() {
    if (this.props.loginInitialized && this.props.user && this.props.user.admin) {
      return <AdminCheckbox user={this.props.user} onChange={this.toggleAdminMode} checked={this.props.adminMode} />;
    }

    return null;
  }

}

AdminContainer.defaultProps = {
  adminMode: false,
  loginInitialized: false,
  user: null,
};

AdminContainer.propTypes = {
  adminMode: React.PropTypes.bool,
  dispatch: React.PropTypes.func.isRequired,
  loginInitialized: React.PropTypes.bool,
  user: React.PropTypes.shape({
    id: React.PropTypes.string,
    admin: React.PropTypes.bool,
  }),
};

function mapStateToProps(state) {
  return {
    adminMode: state.adminMode,
    loginInitialized: state.initialized,
    user: state.user,
  };
}

export default connect(mapStateToProps)(AdminContainer);
