import React from 'react';
import { Link } from 'react-router';

import HeaderAuth from './HeaderAuth';

export default class App extends React.Component {
  returnSomething(something) { // eslint-disable-line class-methods-use-this
    // this is only for testing purposes. Check /test/components/App-test.js
    return something;
  }
  render() {
    return (
      <div>
        <header className="site-header">
          <h1 className="title">Zooniverse Lab</h1>
          <HeaderAuth />
        </header>
        <section className="content-section">
          {this.props.children || 'Welcome'}
        </section>
      </div>
    );
  }
}
App.propTypes = {
  children: React.PropTypes.node,
};
