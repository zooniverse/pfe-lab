import React from 'react';
import PropTypes from 'prop-types';

export const organizationShape = PropTypes.shape({
  id: PropTypes.string,
  display_name: PropTypes.string,
  description: PropTypes.string,
  introduction: PropTypes.string
});

export const organizationsShape = PropTypes.arrayOf(organizationShape);

export const organizationCollaboratorsShape = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string,
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
);

export const organizationOwnerShape = PropTypes.shape({
  display_name: PropTypes.string,
  id: PropTypes.string,
});

export const organizationAvatarShape = PropTypes.shape({
  src: PropTypes.string
});

export const organizationsAvatarsShape = PropTypes.arrayOf(organizationAvatarShape);

export const organizationBackgroundShape = PropTypes.shape({
  src: PropTypes.string
});

export const organizationPageShape = PropTypes.shape({
  id: PropTypes.string,
  url_key: PropTypes.string,
});
