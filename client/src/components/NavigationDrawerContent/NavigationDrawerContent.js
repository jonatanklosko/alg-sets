import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Signature from '../Signature/Signature';

const NavigationDrawerContent = ({ name, thumbUrl, apolloClient }) => (
  <Fragment>
    <Grid container direction="column" alignItems="center" style={{ padding: 8 }}>
      <Grid item>
        <Avatar src={thumbUrl} style={{ width: 60, height: 60 }} />
      </Grid>
      <Grid item style={{ marginTop: 8 }}>
        <Typography variant="subtitle2">{name}</Typography>
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
      <ListItem
        button
        onClick={() => {
          fetch('/oauth/sign-out', { credentials: 'same-origin' })
            .then(() => apolloClient.resetStore());
        }}
      >
        <ListItemIcon><Icon>exit_to_app</Icon></ListItemIcon>
        <ListItemText primary="Sign out" />
      </ListItem>
    </List>
    <div style={{ flexGrow: 1 }} />
    <div style={{ padding: 16 }}>
      <Signature />
    </div>
  </Fragment>
);

export default NavigationDrawerContent;
