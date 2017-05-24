import React from 'react';

const AdminToggle = ({ adminMode, toggleAdminMode }) => {
  const toggleClass = adminMode ? 'footer-admin-toggle--active' : 'footer-admin-toggle';

  return (
    <label
      className={toggleClass}
      htmlFor="adminMode"
    >
      <input type="checkbox" checked={adminMode} id="adminMode" value={adminMode} onChange={toggleAdminMode} />{' '}
      Admin Mode
    </label>
  );
};

AdminToggle.defaultProps = {
  adminMode: false,
  toggleAdminMode: () => {}
};

AdminToggle.propTypes = {
  adminMode: React.PropTypes.bool.isRequired,
  toggleAdminMode: React.PropTypes.func.isRequired,
};

export default AdminToggle;
