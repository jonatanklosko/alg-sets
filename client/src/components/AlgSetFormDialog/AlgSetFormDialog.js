import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import { ALG_SETS_QUERY } from '../AlgSetList/AlgSetList';

const CREATE_ALG_SET_MUTATION = gql`
  mutation CreateAlgSet($name: String!, $secret: Boolean!) {
    createAlgSet(name: $name, secret: $secret) {
      id
      name
      secret
      algs
    }
  }
`;

const UPDATE_ALG_SET_MUTATION = gql`
  mutation UpdateAlgSet($id: ID!, $name: String, $secret: Boolean) {
    updateAlgSet(id: $id, name: $name, secret: $secret) {
      id
      name
      secret
      algs
    }
  }
`;

const AlgSetFormDialog = ({ children }) => {
  const [algSet, setAlgSet] = useState(null);
  const { id, name, secret } = { name: '', secret: false, ...(algSet || {}) };
  const close = () => setAlgSet(null);
  const open = !!algSet;
  return (
    <Fragment>
      {children(setAlgSet)}
      <Dialog open={open} onClose={close}>
        <DialogTitle>{id ? 'Edit alg set' : 'New alg set'}</DialogTitle>
        <DialogContent>
          <Grid container direction="column">
            <Grid item>
              <TextField
                autoFocus
                label="Name"
                value={name}
                onChange={event => setAlgSet({ ...algSet, name: event.target.value })}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox checked={secret} onChange={() => setAlgSet({ ...algSet, secret: !secret })} />}
                label="Secret"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Mutation
            mutation={id ? UPDATE_ALG_SET_MUTATION : CREATE_ALG_SET_MUTATION}
            variables={{ id, name, secret }}
            update={(store, { data: { createAlgSet, updateAlgSet } }) => {
              const data = store.readQuery({ query: ALG_SETS_QUERY });
              data.me.algSets = id
                ? data.me.algSets.map(algSet => algSet.id === updateAlgSet.id ? updateAlgSet : algSet)
                : data.me.algSets.concat(createAlgSet);
              store.writeQuery({ query: ALG_SETS_QUERY, data });
            }}
            onCompleted={close}
          >
            {(createAlgSet, { error, loading }) => (
              <Button onClick={createAlgSet} disabled={!name || loading}>
                {id ? 'Update' : 'Create'}
              </Button>
            )}
          </Mutation>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AlgSetFormDialog;
