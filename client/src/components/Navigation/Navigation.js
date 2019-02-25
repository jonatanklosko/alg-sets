import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, Switch, Route, Redirect } from 'react-router-dom';
import classNames from 'classnames';
import { makeStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import LinearProgress from '@material-ui/core/LinearProgress';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import NavigationDrawerContent from '../NavigationDrawerContent/NavigationDrawerContent';
import Home from '../Home/Home';
import AlgSetList from '../AlgSetList/AlgSetList';
import AlgSet from '../AlgSet/AlgSet';
import StarredAlgSetList from '../StarredAlgSetList/StarredAlgSetList';
import Explore from '../Explore/Explore';
import AccountSettings from '../AccountSettings/AccountSettings';

const USER_QUERY = gql`
  query {
    me {
      id
      name
      avatar {
        thumbUrl
      }
    }
  }
`;

const drawerWidth = 250;

const useStyles = makeStyles(theme => ({
  appBarShift: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
    },
  },
  content: {
    padding: 24,
  },
  contentShift: {
    [theme.breakpoints.up('sm')]: {
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  title: {
    flexGrow: 1,
  },
  titleLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
}));

const Navigation = () => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Query query={USER_QUERY}>
      {({ error, loading, data, client }) => {
        if (error) return <div>Error</div>;
        if (loading) return <LinearProgress />;
        const { me } = data;
        const signedIn = !!me;

        return (
          <Fragment>
            <AppBar position="static" className={classNames({ [classes.appBarShift]: signedIn })}>
              <Toolbar>
                {signedIn && (
                  <IconButton color="inherit" className={classes.menuButton} onClick={() => setMobileOpen(true)}>
                    <Icon>menu</Icon>
                  </IconButton>
                )}
                <Typography variant="h6" color="inherit" className={classes.title}>
                  <Link to={signedIn ? '/alg-sets' : '/'} className={classes.titleLink}>Alg Sets</Link>
                </Typography>
                <Button component={Link} to="/explore" color="inherit">Explore</Button>
                {!signedIn && <Button href="/oauth/sign-in" color="inherit">Sign in</Button>}
              </Toolbar>
            </AppBar>
            {signedIn && (
              <Fragment>
                <Hidden smUp>
                  <Drawer
                    className={classes.drawer}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    classes={{ paper: classes.drawer }}
                    onClick={() => setMobileOpen(false)}
                  >
                    <NavigationDrawerContent name={me.name} thumbUrl={me.avatar.thumbUrl} apolloClient={client} />
                  </Drawer>
                </Hidden>
                <Hidden xsDown>
                  <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{ paper: classes.drawer }}
                  >
                    <NavigationDrawerContent name={me.name} thumbUrl={me.avatar.thumbUrl} apolloClient={client} />
                  </Drawer>
                </Hidden>
              </Fragment>
            )}
            <main className={classNames(classes.content, { [classes.appBarShift]: signedIn })}>
              {signedIn ? (
                <Switch>
                  <Route path="/explore" component={Explore} />
                  <Route exact path="/alg-sets" component={AlgSetList} />
                  <Route exact path="/alg-sets/:id" component={AlgSet} />
                  <Route exact path="/starred" component={StarredAlgSetList} />
                  <Route exact path="/me" component={AccountSettings} />
                  <Redirect to="/alg-sets" />
                </Switch>
              ) : (
                <Switch>
                  <Route exact path="/" component={Home} />
                  <Route path="/explore" component={Explore} />
                  <Route exact path="/alg-sets/:id" component={AlgSet} />
                  <Redirect to="/" />
                </Switch>
              )}
            </main>
          </Fragment>
        );
      }}
    </Query>
  );
};

export default Navigation;
