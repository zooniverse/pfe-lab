import PropTypes from 'prop-types';
import React from 'react';
import { FileButton, MediaIcon } from 'zooniverse-react-components';
import DragAndDropTarget from '../containers/drag-and-drop-target';

export default class MediaAreaView extends React.Component {
  constructor(props) {
    super(props);

    this.renderMediaList = this.renderMediaList.bind(this);
  }

  renderMediaList() {
    return this.props.media.map((medium) => {
      if (this.props.pendingMedia.includes(medium)) {
        return null;
      }

      return (
        <li key={medium.id} className="media-area-item">
          <MediaIcon resource={medium} onDelete={this.props.onDelete} />
        </li>
      );
    });
  }

  render() {
    const addButtonStyle = {
      height: '80px',
      lineHeight: '100px',
      width: '100px',
    };

    return (
      <div
        className={`media-area ${this.props.className}`.trim()}
        style={{ position: 'relative' }}
      >
        {(this.props.pendingFiles.length !== 0) ? <hr /> : null}
        {this.props.pendingFiles.map(file => (
          <div key={file.name}>
            <small>
              <i className="fa fa-spinner fa-spin" />{' '}
              <strong>{file.name}</strong>
            </small>
          </div>))}
        {this.props.errors.map(({ file, error }) => (
          <div key={file.name}>{error.toString()} ({file.name})</div>
        ))}
        {this.props.errors.length !== 0 && <hr />}

        <DragAndDropTarget
          style={{
            bottom: '3px',
            left: '3px',
            position: 'absolute',
            right: '3px',
            top: '3px'
          }}
          onDrop={this.props.onDrop}
        />

        {(this.props.media && this.props.media.length === 0) ? <small><em>No media</em></small> : null}

        <ul className="media-area-list">
          <li className="media-area-item" style={{ alignSelf: 'stretch' }}>
            <div className="media-icon">
              <FileButton
                className="media-area-add-button"
                accept="image/*"
                multiple={true}
                style={addButtonStyle}
                onSelect={this.props.onSelect}
              >
                <i className="fa fa-plus fa-3x" />
              </FileButton>
              <div className="media-icon-label">Select files</div>
            </div>
          </li>

          {this.props.media && this.renderMediaList()}
        </ul>

        {this.props.children && <hr />}
        {this.props.children}
      </div>
    );
  }
}

MediaAreaView.defaultProps = {
  children: null,
  className: '',
  errors: [],
  media: [],
  onDelete: () => {},
  onDrop: () => {},
  onSelect: () => {},
  pendingFiles: [],
  pendingMedia: []
};

MediaAreaView.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  errors: PropTypes.arrayOf(PropTypes.object),
  media: PropTypes.arrayOf(PropTypes.object),
  onDelete: PropTypes.func,
  onDrop: PropTypes.func,
  onSelect: PropTypes.func,
  pendingFiles: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string
  })),
  pendingMedia: PropTypes.arrayOf(PropTypes.shape({
    src: PropTypes.string
  }))
};
