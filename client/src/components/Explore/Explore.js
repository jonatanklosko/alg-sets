import React, { Fragment } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import AlgSetList from './AlgSetList/AlgSetList';
import AlgList from './AlgList/AlgList';

const Explore = ({ location }) => (
  <Fragment>
    <Tabs value={location.pathname} centered style={{ marginBottom: 16 }}>
      <Tab label="Alg sets" value="/explore/alg-sets" component={Link} to="/explore/alg-sets" />
      <Tab label="Algs" value="/explore/algs" component={Link} to="/explore/algs" />
    </Tabs>
    <Switch>
      <Route exact path="/explore/alg-sets" component={AlgSetList} />
      <Route exact path="/explore/algs" component={AlgList} />
      <Redirect to="/explore/alg-sets" />
    </Switch>
  </Fragment>
);

export default Explore;
