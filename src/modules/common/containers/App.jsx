import React from 'react';
import { connect } from 'react-redux';
import apiClient from 'panoptes-client/lib/api-client';
import Layout from '../components/layout';
import { setAdminMode } from '../action-creators';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.toggleAdminMode = this.toggleAdminMode.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('adminFlag') && !this.props.adminMode) {
      this.props.dispatch(setAdminMode(!this.props.adminMode));
      apiClient.update({
        'params.admin': localStorage.getItem('adminFlag'),
      });
    }
  }

  toggleAdminMode(e) {
    apiClient.update({
      'params.admin': e.target.checked || undefined,
    });

    if (e.target.checked) {
      localStorage.setItem('adminFlag', true);
    } else {
      localStorage.removeItem('adminFlag');
    }

    this.props.dispatch(setAdminMode(!this.props.adminMode));
  }

  render() {
    if (this.props.children) {
      return (
        <Layout {...this.props} toggleAdminMode={this.toggleAdminMode} >
          {this.props.children}
        </Layout>
      );
    }
    return (
      <Layout {...this.props} toggleAdminMode={this.toggleAdminMode} />
    );
  }
}

App.propTypes = {
  adminMode: React.PropTypes.bool,
  children: React.PropTypes.node,
  dispatch: React.PropTypes.func,
};

App.defaultProps = {
  adminMode: false,
  children: null,
};

function mapStateToProps(state) {
  return {
    adminMode: state.adminMode,
  };
}

export default connect(mapStateToProps)(App);
