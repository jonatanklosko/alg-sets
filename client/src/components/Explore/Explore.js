import React, { Fragment } from 'react';
import { Switch, Route, Redirect, Link } from 'react-router-dom';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

const Explore = ({ location }) => (
  <Fragment>
    <Tabs value={location.pathname} centered variant="fullWidth">
      <Tab label="Alg sets" value="/explore/alg-sets" component={Link} to="/explore/alg-sets" />
      <Tab label="Algs" value="/explore/algs" component={Link} to="/explore/algs" />
      <Tab label="People" value="/explore/people" component={Link} to="/explore/people" />
    </Tabs>
    <Switch>
      <Route exact path="/explore/alg-sets" render={() => "Alg sets"} />
      <Route exact path="/explore/algs" render={() => "Algs"} />
      <Route exact path="/explore/people" render={() => "People"} />
      <Redirect to="/explore/alg-sets" />
    </Switch>
  </Fragment>
);

export default Explore;
