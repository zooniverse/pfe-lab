import React from 'react';
import { connect } from 'react-redux';
// import apiClient from 'panoptes-client/lib/api-client';
import { MediaArea } from 'zooniverse-react-components';

// TODO, COPIED FROM PFE...
// import putFile from '../../../lib/put-file';
// import mediaActions from '../actions/media';

import { organizationShape } from '../model';

export class MediaContainer extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      saving: false,
    };

    this.fetchMedia = this.fetchMedia.bind(this);
    this.renderValidExtensions = this.renderValidExtensions.bind(this);
  }

  componentDidMount() {
    this.fetchMedia();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      this.fetchMedia(nextProps.organization);
    }
  }

  fetchMedia() {
    console.log('wutwutwut', this.state.saving);
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
        <MediaArea />
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
