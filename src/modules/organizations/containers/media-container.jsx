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
      errors: [],
      media: null,
      pendingFiles: [],
      pendingMedia: [],
      saving: false,
    };

    this.fetchMedia = this.fetchMedia.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleFileSelection = this.handleFileSelection.bind(this);
    this.addFiles = this.addFiles.bind(this);
    this.addFile = this.addFile.bind(this);
    this.createLinkedResource = this.createLinkedResource.bind(this);
    this.uploadMedia = this.uploadMedia.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
    this.handleError = this.handleError.bind(this);
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
          return media.filter(medium => Object.keys(medium.metadata).length > 0);
        })
        .then((filteredMedia) => {
          this.setState({ media: filteredMedia });
        })
        .catch(error => console.error(error));
    }
  }

  handleDrop(event) {
    if (event[0].target.files.length !== 0) {
      this.addFiles(Array.prototype.slice.call(event[0].dataTransfer.files));
    }
  }

  handleDelete() {
    console.log('Refreshing media area');
    this.fetchMedia();
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
      .catch(this.handleError.bind(this, file))
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

  uploadMedia(file, medium) {
    console.log(`Uploading ${file.name} => ${medium.src}`);
    const headers = new Headers();
    const params = {
      method: 'PUT',
      headers,
      mode: 'cors',
      body: file
    };

    return fetch(medium.src, params)
      .then((response) => {
        console.log('response from uploadMedia', response);
        if (response.ok) {
          return medium.refresh().then((media) => {
            console.log('([].concat(media)[0])... ', ([].concat(media)[0]));
            return ([].concat(media)[0]);
          });
        }
      })
      .catch(error => (
        medium.delete().then(() => {
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

  handleError(file, error) {
    console.log(`Got error ${error.message} for ${file.name}`);
    const errors = this.state.errors;
    errors.push({ file, error });
    this.setState({ errors });
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
          errors={this.state.errors}
          media={this.state.media}
          onDelete={this.handleDelete}
          onDrop={this.handleDrop}
          onSelect={this.handleFileSelection}
          pendingFiles={this.state.pendingFiles}
          pendingMedia={this.state.pendingMedia}
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
