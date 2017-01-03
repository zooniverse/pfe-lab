import React from 'react';
import { Link } from 'react-router';
import Layout from '../components/layout';

export default class App extends React.Component {
  returnSomething(something) { // eslint-disable-line class-methods-use-this
    // this is only for testing purposes. Check /test/components/App-test.js
    return something;
  }

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
  navItems: React.PropTypes.arrayOf(React.PropTypes.object), // eslint-disable-line react/no-unused-prop-types
};

App.defaultProps = {
  children: null,
};
