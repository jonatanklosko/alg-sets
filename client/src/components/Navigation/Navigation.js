import React, { Fragment, useState } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
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

const USER_QUERY = gql`
  query {
    me {
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
    padding: theme.spacing.unit * 3,
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
}));

const Navigation = ({ children }) => {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <Query query={USER_QUERY}>
      {({ error, loading, data }) => {
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
                  Alg Sets
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
                  >
                    <div tabIndex={0} onClick={() => setMobileOpen(false)}>
                      <NavigationDrawerContent name={me.name} thumbUrl={me.avatar.thumbUrl} />
                    </div>
                  </Drawer>
                </Hidden>
                <Hidden xsDown>
                  <Drawer
                    className={classes.drawer}
                    variant="permanent"
                    classes={{ paper: classes.drawer }}
                  >
                    <NavigationDrawerContent name={me.name} thumbUrl={me.avatar.thumbUrl} />
                  </Drawer>
                </Hidden>
              </Fragment>
            )}
            <main className={classNames(classes.content, { [classes.appBarShift]: signedIn })}>
              {children}
            </main>
          </Fragment>
        );
      }}
    </Query>
  );
};

export default Navigation;
