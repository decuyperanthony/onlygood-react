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

// import CancelIcon from '@material-ui/icons/Cancel';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line import/no-extraneous-dependencies
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
    history.push('/');

    // dispatch({ type: RESET });
    // dispatch({ type: DISCONNECT });
    // dispatch(enterLoginPage(history));
  };

  return (
    <div>
      <MenuItem style={{ borderTop: '1px solid #E0E0E0' }} onClick={handleClickOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ExitToAppIcon style={{ color: '#EB5757' }} />
        </IconButton>
        <span
          style={{ color: '#EB5757' }}
        >
          Logout
        </span>

      </MenuItem>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          id="alert-dialog-title"
          style={{ color: '#EB5757' }}
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
            style={{ color: '#EB5757', marginBottom: '.5em', border: '1px solid #EB5757' }}
            variant="outlined"
          >
            No
          </Button>
          <Button
            onClick={handleLogout}
            style={{
              color: 'white', marginRight: '.5em', marginBottom: '.5em', backgroundColor: '#EB5757',
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
