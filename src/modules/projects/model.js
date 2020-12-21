import React from 'react';
import PropTypes from 'prop-types';

export const projectShape = PropTypes.shape({
  id: PropTypes.string,
  display_name: PropTypes.string,
  description: PropTypes.string,
});

export const projectsShape = PropTypes.arrayOf(projectShape);
