import React, { Fragment } from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';
import gql from 'graphql-tag';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

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

const Navigation = () => (
  <Query query={USER_QUERY}>
    {({ error, loading, data }) => {
      if (error) return <div>Error fetching data</div>;
      if (loading) return <div>Fetching data</div>;
      const { me } = data;
      return (
        <Fragment>
          <AppBar position="static">
            <Toolbar>
              <IconButton color="inherit">
                <Icon>menu</Icon>
              </IconButton>
              <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
                Alg Sets
              </Typography>
              <Button component={Link} to="/explore" color="inherit">Explore</Button>
              {!me && <Button href="/oauth/sign-in" color="inherit">Sign in</Button>}
            </Toolbar>
          </AppBar>
          {me && (
            <Drawer
              variant="persistent"
              anchor="left"
              open={true}
            >
              <Grid container direction="column" alignItems="center" style={{ padding: 8 }}>
                <Grid item>
                  <Avatar src={me.avatar.thumbUrl} />
                </Grid>
                <Grid item style={{ marginTop: 8 }}>
                  <Typography variant="subtitle2">{me.name}</Typography>
                </Grid>
              </Grid>
              <Divider />
              <List>
                <ListItem button component={Link} to="/alg-sets">
                  <ListItemIcon><Icon>folder</Icon></ListItemIcon>
                  <ListItemText primary="My alg sets" />
                </ListItem>
                <ListItem button component={Link} to="/starred">
                  <ListItemIcon><Icon>folder_special</Icon></ListItemIcon>
                  <ListItemText primary="Starred" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button>
                  <ListItemIcon><Icon>exit_to_app</Icon></ListItemIcon>
                  <ListItemText primary="Sign out" />
                </ListItem>
              </List>
            </Drawer>
          )}
        </Fragment>
      );
    }}
  </Query>
);

export default Navigation;
