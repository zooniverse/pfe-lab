import React from 'react';
import { connect } from 'react-redux';
import Layout from '../components/layout';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.children) {
      return (
        <Layout {...this.props} >
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
  dispatch: React.PropTypes.func,
};

App.defaultProps = {
  children: null,
};
