import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import AlgImage from '../AlgImage/AlgImage';
import { ALG_SETS_QUERY } from '../AlgSetList/AlgSetList';
import { preventDefault } from '../../logic/utils';
import stages from '../../logic/stages';

const CREATE_ALG_SET_MUTATION = gql`
  mutation CreateAlgSet($name: String!, $secret: Boolean!, $stage: String!, $topView: Boolean!) {
    createAlgSet(name: $name, secret: $secret, stage: $stage, topView: $topView) {
      id
      name
      secret
      stage
      topView
      algs
    }
  }
`;

const UPDATE_ALG_SET_MUTATION = gql`
  mutation UpdateAlgSet($id: ID!, $name: String, $secret: Boolean, $stage: String, $topView: Boolean) {
    updateAlgSet(id: $id, name: $name, secret: $secret, stage: $stage, topView: $topView) {
      id
      name
      secret
      stage
      topView
      algs
    }
  }
`;

const AlgSetFormDialog = ({ children }) => {
  const [algSet, setAlgSet] = useState(null);
  const { id, name, secret, stage, topView } = {
    name: '', secret: false, stage: 'full', topView: false, ...(algSet || {}),
  };
  const close = () => setAlgSet(null);
  const open = !!algSet;
  return (
    <Fragment>
      {children(setAlgSet)}
      <Dialog open={open} onClose={close} fullWidth>
        <DialogTitle>{id ? 'Edit alg set' : 'New alg set'}</DialogTitle>
        <Mutation
          mutation={id ? UPDATE_ALG_SET_MUTATION : CREATE_ALG_SET_MUTATION}
          variables={{ id, name, secret, stage, topView }}
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
            <form onSubmit={preventDefault(createAlgSet)}>
              <DialogContent>
                <Grid container direction="column">
                  <Grid item>
                    <TextField
                      autoFocus
                      label="Name"
                      value={name}
                      onChange={event => setAlgSet({ ...algSet, name: event.target.value })}
                      fullWidth
                    />
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox checked={secret} onChange={() => setAlgSet({ ...algSet, secret: !secret })} />}
                      label="Secret"
                    />
                  </Grid>
                  <Grid item>
                    <Typography variant="subtitle2" gutterBottom>Cube preview</Typography>
                  </Grid>
                  <Grid item>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="stage">Stage</InputLabel>
                      <Select
                        inputProps={{ name: 'stage', id: 'stage' }}
                        value={stage}
                        onChange={event => setAlgSet({ ...algSet, stage: event.target.value })}
                      >
                        {stages.map(({ id, name }) => (
                          <MenuItem value={id} key={id}>{name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item>
                    <FormControlLabel
                      control={<Checkbox checked={topView} onChange={() => setAlgSet({ ...algSet, topView: !topView })} />}
                      label="Top view"
                    />
                  </Grid>
                  <Grid item style={{ textAlign: 'center' }}>
                    <AlgImage options={{ stage, topView }} />
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions>
                <Button type="submit" disabled={!name || loading}>
                  {id ? 'Update' : 'Create'}
                </Button>
              </DialogActions>
            </form>
          )}
        </Mutation>
      </Dialog>
    </Fragment>
  );
};

export default AlgSetFormDialog;
