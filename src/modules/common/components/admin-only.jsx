import React from 'react';
import { connect } from 'react-redux';

const AdminOnly = ({ children, user }) =>
  <div>
    {user && user.admin ? children : null}
  </div>;

AdminOnly.propTypes = {
  children: React.PropTypes.node,
  user: React.PropTypes.shape({ id: React.PropTypes.string }),
};

AdminOnly.defaultProps = {
  children: {},
  user: null,
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(AdminOnly);
