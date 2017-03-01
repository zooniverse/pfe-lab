import React from 'react';

const AdminToggle = ({ adminMode, toggleAdminMode }) => {
  const toggleClass = adminMode ? 'footer-admin-toggle--active' : '';

  return (
    <label
      className={`footer-admin-toggle ${toggleClass}`}
      htmlFor="adminMode"
    >
      <input type="checkbox" checked={adminMode} value={adminMode} onChange={toggleAdminMode} />{' '}
      Admin Mode
    </label>
  );
};

AdminToggle.propTypes = {
  adminMode: React.PropTypes.bool,
  toggleAdminMode: React.PropTypes.func.isRequired,
};

export default AdminToggle;
