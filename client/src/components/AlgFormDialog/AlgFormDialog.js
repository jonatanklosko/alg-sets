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

import { prettify } from '../../logic/moves';

const ADD_ALG_TO_ALG_SET_MUTATION = gql`
  mutation AddAlgToAlgSet($id: ID!, $alg: String!) {
    addAlgToAlgSet(id: $id, alg: $alg) {
      id
      algs
    }
  }
`;

const AlgFormDialog = ({ children, algSetId }) => {
  const [alg, setAlg] = useState(null);
  const close = () => setAlg(null);
  const open = !!alg || alg === '';
  return (
    <Fragment>
      {children(setAlg)}
      <Dialog open={open} onClose={close} fullWidth>
        <DialogTitle>{'Add new alg'}</DialogTitle>
        <DialogContent style={{ textAlign: 'center' }}>
          <img src={`http://cube.crider.co.uk/visualcube.php?fmt=svg&size=150&bg=t&pzl=3&alg=${alg}&sch=wrgyob&r=y34x-34`} />
          <TextField
            autoFocus
            fullWidth
            label="Alg"
            value={alg || ''}
            onChange={event => setAlg(prettify(event.target.value))}
          />
        </DialogContent>
        <DialogActions>
          <Mutation
            mutation={ADD_ALG_TO_ALG_SET_MUTATION}
            variables={{ id: algSetId, alg }}
            onCompleted={close}
          >
          {(addAlgToAlgSet, { error, loading }) => (
            <Button onClick={addAlgToAlgSet} disabled={!alg || loading}>
              Add
            </Button>
          )}
          </Mutation>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default AlgFormDialog;
