import React from 'react';
import { Link } from 'react-router';
import Layout from '../components/layout';

export default class App extends React.Component {

  render() {
    if (this.props.children) {
      return (
        <Layout {...this.props}>
          {this.props.children}
        </Layout>
      );
    }
    return (
      <Layout {...this.props}>
        <h2>Welcome</h2>
        <Link to="organizations">Organizations</Link>
      </Layout>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

App.defaultProps = {
  children: null,
};
