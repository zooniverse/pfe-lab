import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';
import MediaArea from '../components/media-area';

// import { setCurrentOrganization } from '../action-creators';
import { organizationShape } from '../model';

export class MediaContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pendingFiles: [],
      pendingMedia: [],
      saving: false,
    };

    this.fetchMedia = this.fetchMedia.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.addFile = this.addFile.bind(this);
    this.createLinkedResource = this.createLinkedResource.bind(this);
    this.uploadMedia = this.uploadMedia.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    // this.handleError = this.handleError.bind(this);
    this.removeFromPending = this.removeFromPending.bind(this);
    this.renderValidExtensions = this.renderValidExtensions.bind(this);
  }

  componentDidMount() {
    if (this.props.organization) {
      this.fetchMedia(this.props.organization);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      this.fetchMedia(nextProps.organization);
    }
  }

  // componentWillUnmount() {
  //   this.props.dispatch(setMedia({}));
  // }

  fetchMedia(org = this.props.organization) {
    if (org.links.attached_images && org.links.attached_images.ids && org.links.attached_images.ids.length > 0) {
      org.get('attached_images')
        .then((media) => {
          console.log('media from fetchMedia', media);
          return media.filter(medium => Object.keys(medium.metadata).length > 0);
        })
        .then((filteredMedia) => {
          console.log('filteredMedia from fetchMedia', filteredMedia);
        })
        .catch(error => console.error(error));
    }
  }

  handleDrop(event) {
    if (event[0].target.files.length !== 0) {
      this.addFiles(Array.prototype.slice.call(event[0].dataTransfer.files));
    }
  }

  handleFileSelection(event) {
    if (event[0].target.files.length !== 0) {
      this.addFiles(Array.prototype.slice.call(event[0].target.files));
    }
  }

  addFiles(files) {
    console.log(`Adding ${files.length} files`);
    files.forEach(this.addFile);
  }

  addFile(file) {
    console.log(`Adding media ${file.name}`);
    const pendingFiles = this.state.pendingFiles;
    pendingFiles.push(file);
    this.setState({ pendingFiles });

    return this.createLinkedResource(file)
      .then(this.uploadMedia.bind(this, file))
      .then(this.handleSuccess)
      .catch(error => console.error(error))
      .then(this.removeFromPending.bind(this, file))
      .then(this.fetchMedia());
  }

  createLinkedResource(file, location = this.props.organization._getURL('attached_images')) {
    console.log(`Creating resource for ${file.name}, (${file.type})`);
    const payload = {
      media: {
        content_type: file.type,
        metadata: { filename: file.name }
      }
    };

    return apiClient.post(location, payload)
      .then(([media]) => {
        console.log('media from createLinkedResource', media);
        const pendingMedia = this.state.pendingMedia;
        pendingMedia.push(media);
        this.setState({ pendingMedia });
        return media;
      });
  }

  uploadMedia(file, media) {
    console.log(`Uploading ${file.name} => ${media.src}`);
    const headers = new Headers();
    const params = {
      method: 'PUT',
      headers,
      mode: 'cors',
      body: file
    };

    return fetch(media.src, params)
      .then((response) => {
        console.log('response from uploadMedia', response);
      })
      .catch(error => (
        media.delete().then(() => {
          throw error;
        })
      ));
  }

  handleSuccess(media) {
    console.log(`Success! ${media.metadata.filename}`);
    const pendingMedia = this.state.pendingMedia;
    const pendingMediaIndex = pendingMedia.indexOf(media);
    pendingMedia.splice(pendingMediaIndex, 1);
    this.setState({ pendingMedia });
    return media;
  }

  removeFromPending(file) {
    console.log(`No longer pendingFiles: ${file.name}`);
    const pendingFiles = this.state.pendingFiles;
    const pendingFileIndex = pendingFiles.indexOf(file);
    pendingFiles.splice(pendingFileIndex, 1);
    this.setState({ pendingFiles });
  }

  refreshOrganization() {
    this.props.organization.uncacheLink('attached_images');
    return this.props.organization.refresh();
  }

  renderValidExtensions() {
    return this.props.validSubjectExtensions.map((ext, i) => {
      const codeMarkup = <code key={ext}>{ext}</code>;
      if (this.props.validSubjectExtensions[i + 1]) {
        return <span key={ext}><code>{ext}</code>,{' '}</span>;
      }

      return codeMarkup;
    });
  }

  render() {
    return (
      <div>
        <div>
          <p>
            <strong>You can add images here to use in your organization’s content.</strong>
            <br />
            Just copy and paste the image’s Markdown code: <code>![title](url)</code>.
            <br />
            Images can be any of: {this.renderValidExtensions()}.
          </p>
        </div>
        <MediaArea
          onDrop={this.handleDrop}
          onSelect={this.handleFileSelection}
        />
      </div>
    );
  }
}

MediaContainer.defaultProps = {
  validSubjectExtensions: ['.jpg', '.jpeg', '.png', '.gif', '.svg'],
};

MediaContainer.propTypes = {
  // dispatch: React.PropTypes.func,
  organization: organizationShape,
  validSubjectExtensions: React.PropTypes.arrayOf(React.PropTypes.string)
};

function mapStateToProps(state) {
  return {
    organization: state.organization
  };
}

export default connect(mapStateToProps)(MediaContainer);
