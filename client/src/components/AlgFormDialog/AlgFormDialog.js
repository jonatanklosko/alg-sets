import React, { useState, Fragment } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

import { prettify } from '../../logic/moves';
import { algImageUrl, preventDefault } from '../../logic/utils';

const ADD_ALG_TO_ALG_SET_MUTATION = gql`
  mutation AddAlgToAlgSet($id: ID!, $alg: String!) {
    addAlgToAlgSet(id: $id, alg: $alg) {
      id
      algs
    }
  }
`;

const AlgFormDialog = ({ children, algSetId, cubeImageOptions }) => {
  const [alg, setAlg] = useState(null);
  const close = () => setAlg(null);
  const open = !!alg || alg === '';
  return (
    <Fragment>
      {children(setAlg)}
      <Dialog open={open} onClose={close} fullWidth>
        <DialogTitle>{'Add new alg'}</DialogTitle>
        <Mutation
          mutation={ADD_ALG_TO_ALG_SET_MUTATION}
          variables={{ id: algSetId, alg }}
          onCompleted={close}
        >
          {(addAlgToAlgSet, { error, loading }) => (
            <form onSubmit={preventDefault(addAlgToAlgSet)}>
              <DialogContent style={{ textAlign: 'center' }}>
                <img src={algImageUrl(alg, cubeImageOptions)} alt="Alg" />
                <TextField
                  autoFocus
                  fullWidth
                  label="Alg"
                  value={alg || ''}
                  onChange={event => setAlg(prettify(event.target.value))}
                />
              </DialogContent>
              <DialogActions>
                <Button type="submit" disabled={!alg || loading}>
                  Add
                </Button>
              </DialogActions>
            </form>
          )}
        </Mutation>
      </Dialog>
    </Fragment>
  );
};

export default AlgFormDialog;
