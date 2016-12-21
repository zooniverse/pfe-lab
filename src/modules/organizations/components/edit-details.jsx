import React from 'react';

const EditDetails = ({ organization }) => {
  return (
    <div>edit details placeholder {organization.id}</div>
  );
};

EditDetails.defaultProps = {
  organization: { id: 1 },
};

export default EditDetails;
