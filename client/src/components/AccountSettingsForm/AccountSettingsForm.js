import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ColorSchemeEditor from '../ColorSchemeEditor/ColorSchemeEditor';

const UPDATE_USER_MUTATION = gql`
  mutation UpdateMe($colorScheme: String) {
    updateMe(colorScheme: $colorScheme) {
      id
      colorScheme
    }
  }
`;

const AccountSettingsForm = ({ me }) => {
  const [user, setUser] = useState(me);
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h5">Color scheme</Typography>
      </Grid>
      <Grid item>
        <ColorSchemeEditor
          colorScheme={user.colorScheme}
          onChange={colorScheme => setUser({ ...user, colorScheme })}
        />
      </Grid>
      <Grid item style={{ marginTop: 24 }}>
        <Mutation mutation={UPDATE_USER_MUTATION} variables={user}>
          {(updateUser, { error, loading }) => (
            <Button variant="outlined" onClick={updateUser} disabled={loading}>
              Save
            </Button>
          )}
        </Mutation>
      </Grid>
    </Grid>
  );
};

export default AccountSettingsForm;
