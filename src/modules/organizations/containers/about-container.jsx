import React from 'react';
import { connect } from 'react-redux';

import { organizationShape, organizationPagesShape } from '../model';
import { setOrganizationPages } from '../action-creators';

import EditAbout from '../components/edit-about';

class AboutContainer extends React.Component {
  constructor(props) {
    super(props);

    this.fetchPages = this.fetchPages.bind(this);
  }

  componentDidMount() {
    this.fetchPages();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.organization !== this.props.organization) {
      this.fetchPages(nextProps.organization);
    }
  }

  fetchPages(organization = this.props.organization) {
    if (!organization) {
      return;
    }

    organization.get('pages')
      .then((pages) => {
        this.props.dispatch(setOrganizationPages(pages));
      })
      .catch((error) => { console.error(error); });
  }

  render() {
    return (
      <div>
        <EditAbout />
        { this.props.children }
      </div>
    );
  }
}

AboutContainer.propTypes = {
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
  organization: organizationShape,
};

function mapStateToProps(state) {
  return {
    organization: state.organization,
    organizationShapes: state.organizationShapes,
    user: state.user,
  };
}

export default connect(mapStateToProps)(AboutContainer);
