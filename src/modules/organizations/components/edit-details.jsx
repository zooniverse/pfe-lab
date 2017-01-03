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

EditDetails.propTypes = {
  organization: React.PropTypes.shape({
    id: React.PropTypes.string,
    display_name: React.PropTypes.string,
    description: React.PropTypes.string }),
};

export default EditDetails;
