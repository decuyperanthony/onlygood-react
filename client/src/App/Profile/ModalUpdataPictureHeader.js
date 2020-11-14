import React from 'react';
import {
  //   useDispatch,
  useSelector,
} from 'react-redux';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';

import IconButton from '@material-ui/core/IconButton';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CameraAltRoundedIcon from '@material-ui/icons/CameraAltRounded';
// import { IconButton } from '@material-ui/core';
import { API_URL } from '../../utils/constante';
import getUserData from '../../utils/getUserData';

// === style
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  // containerModal: {
  //   // padding: '60px',
  //   minWidth: '300px',
  //   minHeight: '300px',
  // },
  // containerUpdatePicture: {
  //   // display: 'flex',
  //   // justifyContent: 'space-between',
  //   // height: '8em',
  //   marginBottom: '1em',
  // },
  pictureHeader: {
    marginRight: '1em',
    // height: '3em',
    width: '100%',
    border: '2px solid gray',
    marginBottom: '0.5em',
  },

  buttonValidate: {
    backgroundColor: '#2F80ED',
    color: 'white',
    // marginTop: '2em',
    // marginBottom: '2em',
    // height: '40px',
  },
  buttonCancel: {
    backgroundColor: '#EB5757',
    color: 'white',
  },

}));

export default function AlertDialog() {
  const userId = JSON.parse(localStorage.getItem('userId'));
  // eslint-disable-next-line no-unused-vars
  const { register, handleSubmit, errors } = useForm();
  const classes = useStyles();
  const { userData } = useSelector((state) => state.auth);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //!  ------------ON SUBMIT AND Multer ------------
  const onSubmit = (data) => {
    console.log('data', data);
    const formdata = new FormData();
    formdata.append('image', data.imageHeader[0]);

    fetch(`${API_URL}/user/${userId}/updatepictureheader`, {
      method: 'PATCH',
      body: formdata,
    }).then((res) => {
      console.log('res', res);
      getUserData(userId);
    //   getUserById(userId);
    //   getAllPosts();
    //   handleClose();
    }).catch((error) => console.trace(error));
  };

  return (
    <div>
      <IconButton onClick={handleClickOpen}>
        <CameraAltRoundedIcon style={{ color: '#EB5757' }} />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="alert-dialog-title">Update your picture header ?</DialogTitle>
          <DialogContent>
            {/*  {PICTURE HEADER} */}
            <div
              className={classes.containerUpdatePicture}
            >
              <img
                alt="header"
                src={`${API_URL}/img/${userData.picture_header}`}
                className={classes.pictureHeader}
              />
              {/* <div style={{
                backgroundImage: `url(${`${API_URL}/img/${userData.picture_header}`})`,
                height: '15em',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                marginBottom: '-6em',
              }}
              /> */}

              <div>
                <input
                  className={classes.inputUploadFile}
                  type="file"
                  placeholder="image header"
                  name="imageHeader"
                  ref={register({
                    required: false,
                    // pattern: /^\S+@\S+$/i,
                  })}
                />
              </div>
            </div>
          </DialogContent>
          <DialogActions>
            <Button
              className={classes.buttonCancel}
              onClick={handleClose}
            //   color="secondary"
            >
              Close
            </Button>
            <Button
              className={classes.buttonValidate}
              type="submit"
        //   onClick={handleClose}
            //   color="secondary"
              autoFocus
            >
              Validate
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
