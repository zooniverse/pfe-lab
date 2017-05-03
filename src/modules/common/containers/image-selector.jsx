import React from 'react';
import { connect } from 'react-redux';
import { DragAndDropTarget, Thumbnail, FileButton } from 'zooniverse-react-components';

import { organizationShape } from '../../organizations/model';

class ImageSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      height: '',
      width: ''
    };
  }

  componentDidMount() {
    this.getImageDimensions();
  }

  getImageDimensions() {
    let width;
    let height;
    const img = new Image();
    img.onload = function() {
      width = this.width;
      height = this.height;
    };
    img.src = this.props.resourceSrc;
    this.setState({ height, width });
  }

  render() {
    return (
      <div className="image-selector">
        <label className="image-selector__label">
          {this.props.label}
          <DragAndDropTarget style={{height: this.state.height, width: this.state.width}}>
            {!this.props.resourceSrc &&
              <p className="image-selector__placeholder">Drop an image here</p>}
            <FileButton>
              {this.props.resourceSrc &&
                <Thumbnail src={this.props.resourceSrc} width={160} />}
            </FileButton>
          </DragAndDropTarget>
        </label>
      </div>
    );
  }
}

ImageSelector.propTypes = {
  label: React.PropTypes.string,
  organization: organizationShape
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(ImageSelector);
