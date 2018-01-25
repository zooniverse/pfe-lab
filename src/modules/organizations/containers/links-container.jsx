import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { organizationShape } from '../model';
import ExternalLinksEditor from '../../common/components/external-links-editor';
import SocialLinksEditor from '../../common/components/social-links-editor';

class LinksContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUrlsChange = this.handleUrlsChange.bind(this);
    this.resetOrganization = this.resetOrganization.bind(this);

    this.state = {
      show: false,
      urls: []
    };
  }

  componentDidMount() {
    this.setUrls();
  }

  setUrls() {
    let urls = [];
    if (this.props.organization.urls && this.props.organization.urls.length > 1) {
      urls = this.props.organization.urls.slice();
    }
    this.setState({ urls });
  }

  handleSubmit() {
    this.setState({ show: false });
    const filteredUrls = this.state.urls.filter(url => url.label || url.path);
    this.props.updateOrganization({ urls: filteredUrls });
  }

  handleUrlsChange(urls) {
    this.setState({ show: true, urls });
  }

  resetOrganization() {
    this.setState({ show: false });
    this.setUrls();
  }

  render() {
    return (
      <div>
        <h5>Links</h5>
        <div>
          <label className="form__label" htmlFor="external">
            External Links
            <ExternalLinksEditor
              id="external"
              name="external"
              onChange={this.handleUrlsChange}
              urls={this.state.urls}
            />
          </label>
        </div>
        <br />
        <div className="form__fieldset">
          <label className="form__label" htmlFor="social">
            Social Links
            <SocialLinksEditor
              id="social"
              name="social"
              onChange={this.handleUrlsChange}
              urls={this.state.urls}
            />
          </label>
        </div>
        <br />
        <small className="form__help">
          Adding links to the organization will list them in the bottom right section of the organization home page.
          External links will be listed before social links and social links will be shown with the related site icon.
          The link display order within their respective groups can be rearranged by dragging.
        </small>
        {this.state.show &&
        <div>
          <button onClick={this.handleSubmit}>Save</button>
          <button onClick={this.resetOrganization}>Cancel</button>
        </div>}
      </div>);
  }
}

LinksContainer.defaultProps = {
  organization: {},
};

LinksContainer.propTypes = {
  organization: organizationShape,
  updateOrganization: PropTypes.func
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(LinksContainer);
