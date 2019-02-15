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

const UPDATE_ALG_SET_MUTATION = gql`
  mutation AddAlgToAlgSet($id: ID!, $algs: [String!]!) {
    updateAlgSet(id: $id, algs: $algs) {
      id
      algs
    }
  }
`;

const AlgFormDialog = ({ children, algSetId }) => {
  const [algs, setAlgs] = useState(null);
  const close = () => setAlgs(null);
  const open = !!algs;
  return (
    <Fragment>
      {children(setAlgs)}
      <Dialog open={open} onClose={close} fullWidth>
        <DialogTitle>Import/Export algs</DialogTitle>
        <form>
          <DialogContent>
            <TextField
              autoFocus
              multiline
              fullWidth
              label="Algs"
              value={(algs || []).join('\n')}
              onChange={event => setAlgs(event.target.value.split('\n').map(prettify).filter(s => s))}
            />
          </DialogContent>
          <DialogActions>
            <Mutation
              mutation={UPDATE_ALG_SET_MUTATION}
              variables={{ id: algSetId, algs }}
              onCompleted={close}
            >
              {(updateAlgSet, { error, loading }) => (
                <Button type="submit" onClick={updateAlgSet} disabled={!algs || loading}>
                  Save
                </Button>
              )}
            </Mutation>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  );
};

export default AlgFormDialog;
