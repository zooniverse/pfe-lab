import React from 'react';
import { connect } from 'react-redux';
import { DragAndDropTarget, Thumbnail, FileButton } from 'zooniverse-react-components';

import { organizationShape } from '../../organizations/model';

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <DragAndDropTarget>
        <FileButton>
          <Thumbnail />
        </FileButton>
      </DragAndDropTarget>
    );
  }
}

ImageSelector.defaultProps = {
  organization: organizationShape
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(ImageSelector);
