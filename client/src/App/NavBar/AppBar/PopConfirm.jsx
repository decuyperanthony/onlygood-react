/* eslint-disable import/extensions */
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

import CancelIcon from '@material-ui/icons/Cancel';

import { useDispatch } from 'react-redux';

import { useHistory } from 'react-router';
// import { RESET, DISCONNECT } from '../../../../../actions/auth.js';
import { disconnect } from '../../../store/action/auth';

export default function PopConfirm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    dispatch(disconnect());
    history.push('/login');

    // dispatch({ type: RESET });
    // dispatch({ type: DISCONNECT });
    // dispatch(enterLoginPage(history));
  };

  return (
    <div>
      <MenuItem onClick={handleClickOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <CancelIcon style={{ color: 'black' }} />
        </IconButton>
        Disconection
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ color: '#263153' }}
        >
          Are you sure ?
        </DialogTitle>
        {/* <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Etes vous sur de vouloir vous déconnecter?
          </DialogContentText>
        </DialogContent> */}
        <DialogActions>
          <Button
            onClick={handleClose}
            style={{ color: '#263153', marginBottom: '.5em', border: '1px solid #263153' }}
            variant="outlined"
          >
            No
          </Button>
          <Button
            onClick={handleLogout}
            style={{
              color: 'white', marginRight: '.5em', marginBottom: '.5em', backgroundColor: '#263153',
            }}
            autoFocus
            variant="contained"
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
