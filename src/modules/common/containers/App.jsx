import React from 'react';
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
      <Layout {...this.props} />
    );
  }
}

App.propTypes = {
  children: React.PropTypes.node,
};

App.defaultProps = {
  children: null,
};
