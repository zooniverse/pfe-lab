import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setCurrentOrganization } from '../action-creators';
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
      urls: []
    };
  }

  componentDidMount() {
    this.setState({
      urls: this.props.organization.urls
    });
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
    this.props.dispatch(setCurrentOrganization(this.props.organization));
  }

  render() {
    return (
      <div>
        <h5>Links</h5>
        <div>
          <span className="form__label" htmlFor="external urls">
            External Links
            <ExternalLinksEditor
              id="external"
              name="external"
              onChange={this.handleUrlsChange}
              urls={this.state.urls}
            />
          </span>
          <small className="form__help">
            Adding an external link will make it appear as a new tab alongside
            the about, classify, talk, and collect tabs.
          </small>
        </div>
        <br />
        <div className="form__fieldset">
          <span className="form__label">
            Social Links
            <SocialLinksEditor
              id="social"
              name="social"
              onChange={this.handleUrlsChange}
              urls={this.state.urls}
            />
          </span>
          <small className="form__help">
            Adding a social link will append a media icon at the end of your project menu bar.
          </small>
        </div>
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
  dispatch: PropTypes.func,
  organization: organizationShape,
  updateOrganization: PropTypes.func
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
  };
}

export default connect(mapStateToProps)(LinksContainer);
