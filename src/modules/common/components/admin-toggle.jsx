import React from 'react';
import apiClient from 'panoptes-client/lib/api-client';
import { connect } from 'react-redux';
import { setAdminMode } from '../action-creators';

const AdminToggle = ({ adminMode, dispatch }) => {
  if (localStorage.getItem('adminFlag') && !adminMode) {
    dispatch(setAdminMode(!adminMode));
  }

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

  const toggleClass = adminMode ? 'footer-admin-toggle--active' : '';

  return (
    <label
      className={`footer-admin-toggle ${toggleClass}`}
      htmlFor="adminMode"
    >
      <input type="checkbox" checked={adminMode} value={adminMode} onClick={toggleAdminMode} />{' '}
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
