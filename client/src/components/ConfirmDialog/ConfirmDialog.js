import React, { useState, Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ConfirmDialog = ({ children, message }) => {
  const [onConfirm, setOnConfirm] = useState(null);
  const close = () => setOnConfirm(null);
  return (
    <Fragment>
      {children(onConfirm => () => setOnConfirm(() => onConfirm))}
      <Dialog open={!!onConfirm} onClose={close} fullWidth>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={close} color="primary">
            No
          </Button>
          <Button onClick={() => { onConfirm(); close(); }} color="primary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default ConfirmDialog;
