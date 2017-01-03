import React from 'react';

export const organizationShape = React.PropTypes.shape({
  id: React.PropTypes.string,
  display_name: React.PropTypes.string,
  description: React.PropTypes.string,
});

export const organizationsShape = React.PropTypes.arrayOf(organizationShape);
