import React from 'react';

const EditDetails = ({ organization }) => {
  if (!organization) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <h1>{organization.display_name}</h1>
      <p>{organization.description}</p>
    </div>
  );
};

export default EditDetails;
