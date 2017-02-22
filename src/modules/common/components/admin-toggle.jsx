import React from 'react';
import apiClient from 'panoptes-client/lib/api-client';
import { connect } from 'react-redux';
import { setAdminMode } from '../action-creators';

const AdminToggle = ({ adminMode, dispatch }) => {
  const toggleAdminMode = (e) => {
    apiClient.update({
      'params.admin': e.target.checked || undefined,
    });

    if (e.target.checked) {
      localStorage.setItem('adminFlag', true);
    } else {
      localStorage.removeItem('adminFlag');
    }

    dispatch(setAdminMode(!adminMode));
  };

  return (
    <label
      className={adminMode ? 'footer-admin-toggle footer-admin-toggle--active' : 'footer-admin-toggle'}
      htmlFor="adminMode"
    >
      <input type="checkbox" value={adminMode} onClick={toggleAdminMode} />{' '}
      Admin Mode
    </label>
  );
};

AdminToggle.propTypes = {
  adminMode: React.PropTypes.bool,
  dispatch: React.PropTypes.func,
};

function mapStateToProps(state) {
  return {
    adminMode: state.adminMode,
  };
}

export default connect(mapStateToProps)(AdminToggle);
