import React from 'react';
import Layout from '../components/layout';

export default class App extends React.Component {
  returnSomething(something) { // eslint-disable-line class-methods-use-this
    // this is only for testing purposes. Check /test/components/App-test.js
    return something;
  }

  render() {
    return (
      <Layout {...this.props}>
        {this.props.children || <span>Welcome</span>}
      </Layout>
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
  navItems: React.PropTypes.arrayOf(React.PropTypes.object),
};

App.defaultProps = {
  children: null,
};
