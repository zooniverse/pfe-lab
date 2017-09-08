import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../components/layout';

/*
Leaving App to render Layout in case pfe-lab updates to React Router v4,
which could require additional elements within App (eg, <Switch>)
*/

const App = (props) => {
  if (props.children) {
    return (
      <Layout {...props} >
        {props.children}
      </Layout>
    );
  }

  return (
    <Layout {...props} />
  );
};

App.propTypes = {
  children: PropTypes.node
};

App.defaultProps = {
  children: null
};

export default App;
