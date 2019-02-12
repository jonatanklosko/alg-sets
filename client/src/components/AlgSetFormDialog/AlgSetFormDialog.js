import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

const CREATE_ALG_SET_MUTATION = gql`
  mutation CreateAlgSet($name: String!) {
    createAlgSet(name: $name) {
      id
      name
      algs
    }
  }
`;

const AlgSetList = () => {
  const [name, setName] = useState('');
  const [isPrivate, setPrivate] = useState(false);

  return (
    <Dialog open={true}>
      <DialogTitle>New alg set</DialogTitle>
      <DialogContent>
        <Grid container direction="column">
          <Grid item>
            <TextField
              autoFocus
              label="Name"
              value={name}
              onChange={event => setName(event.target.value)}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Checkbox checked={isPrivate} onChange={() => setPrivate(!isPrivate)} />}
              label="Private"
            />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Mutation mutation={CREATE_ALG_SET_MUTATION} variables={{ name }}>
          {(createAlgSet, { error, loading }) => (
            <Button onClick={createAlgSet} disabled={!name || loading}>
              Create
            </Button>
          )}
        </Mutation>
      </DialogActions>
    </Dialog>
  );
};

export default AlgSetList;
