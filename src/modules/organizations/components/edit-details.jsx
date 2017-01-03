import React from 'react';

const EditDetails = ({ organization }) => {
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h2>{organization.display_name}</h2>
      <p>{organization.description}</p>
    </div>
  );
};

export default EditDetails;
