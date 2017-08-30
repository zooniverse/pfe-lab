import React from 'react';
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
  children: React.PropTypes.node
};

App.defaultProps = {
  children: null
};

export default App;
