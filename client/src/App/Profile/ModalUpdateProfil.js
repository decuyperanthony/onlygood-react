/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import {
//   useDispatch,
  useSelector,
} from 'react-redux';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import { useForm } from 'react-hook-form';

// import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import {
  TextField,
  // Link,
  Button,
  Avatar,
  // Card,
  // InputAdornment,
} from '@material-ui/core';
import { API_URL } from '../../utils/constante';
import getUserData from '../../utils/getUserData';
import getAllPosts from '../../utils/getAllPosts';
import getUserById from '../../utils/getUserById';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
const useStyles = makeStyles(() => ({
  containerModal: {
    // padding: '60px',
    minWidth: '500px',
    minHeight: '500px',
  },
  containerUpdatePicture: {
    display: 'flex',
    // justifyContent: 'space-between',
    // height: '8em',
    marginBottom: '1em',
  },
  avatar: {
    marginRight: '1em',
    height: '5em',
    width: '5em',
    border: '2px solid gray',
    // marginBottom: '-5em',
    marginLeft: '2em',
  },
  inputUploadFile: {

  },
  button: {
    color: 'white',
    borderRadius: '4px',
    fontFamily: 'Noto Sans, sans-serif',
    backgroundColor: '#2F80ED',
    padding: '0.5em 1.5em',
    margin: '1em 0',
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },

  textField: {
    paddingBottom: '1em',
    // width: '60%',
    // height: '40px',
  },
  buttonLogin: {
    backgroundColor: '#2F80ED',
    color: 'white',
    // marginTop: '2em',
    // marginBottom: '2em',
    // height: '40px',
  },

}));

const DialogTitle = withStyles(styles)((props) => {
  const {
    children, classes, onClose, ...other
  } = props;
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function ModalUpdateProfil() {
  const userId = JSON.parse(localStorage.getItem('userId'));

  const classes = useStyles();
  //   const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.auth);
  const [open, setOpen] = React.useState(false);
  const { register, handleSubmit, errors } = useForm();
  console.log('userData', userData);
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
    formdata.append('image', data.image[0]);
    formdata.append('firstname', data.firstname);
    formdata.append('lastname', data.lastname);
    formdata.append('description', data.description);

    fetch(`${API_URL}/user/${userId}`, {
      method: 'PATCH',
      body: formdata,
    }).then((res) => {
      console.log('res', res);
      getUserData(userId);
      getUserById(userId);
      getAllPosts();
      handleClose();
    }).catch((error) => console.trace(error));
  };

  return (
    <div>
      <div
        className={classes.button}
        onClick={handleClickOpen}
      >
        Edit your profile
      </div>

      <Dialog
        // style={{ width: '80%' }}
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="customized-dialog-title" onClose={handleClose}>
            Update your profile
          </DialogTitle>
          <DialogContent
            dividers
          >
            <div
              className={classes.containerModal}
            >

              <div
                className={classes.containerUpdatePicture}
              >
                <Avatar
                  variant="rounded"
                  src={`${API_URL}/img/${userData.picture_road}`}
                  className={classes.avatar}
                />
                <div>
                  <input
                    className={classes.inputUploadFile}
                    type="file"
                    placeholder="image"
                    name="image"
                    ref={register({
                      required: false,
                      // pattern: /^\S+@\S+$/i,
                    })}
                  />
                </div>
              </div>
              <div>
                <TextField
                  defaultValue={userData.firstname}
                  error={!!errors.firstname}
                  fullWidth
                  variant="outlined"
              // required
                  className={classes.textField}
                  inputRef={
                    register({
                      required: 'Firstname is required',
                    })
                  }
                  helperText={errors.firstname ? errors.firstname.message : null}
                  type="text"
                // id="standard-adornment-firstname"
                  // id="input-with-icon-textfield"
                  label="Firstname"
                  name="firstname"
                />
              </div>
              <div>
                <TextField
                  defaultValue={userData.lastname}
                  error={!!errors.lastname}
                  fullWidth
                  variant="outlined"
                  className={classes.textField}
                  inputRef={
                    register({
                      required: 'Lastname is required',
                    })
                  }
                  helperText={errors.lastname ? errors.lastname.message : null}
                  type="text"
                  label="Lastname"
                  name="lastname"
                />
              </div>
              <div>
                <TextField
                  fullWidth
                  error={!!errors.description}
                  name="description"
                  label="description"
                  id="outlined-multiline-static"
                // label="Multiline"
                  multiline
                  rows={4}
                  className={classes.textField}
                  defaultValue={userData.description}
                // defaultValue="Default Value"
                  variant="outlined"
                  helperText={errors.description ? errors.description.message : null}
                  inputRef={
                    register({
                      required: 'Description is required',
                    })
                  }
                />
              </div>

            </div>
            {/* <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio, dapibus ac facilisis
            in, egestas eget quam. Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Vivamus sagittis
            lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus magna, vel
            scelerisque nisl consectetur et. Donec sed odio dui. Donec ullamcorper nulla non metus
            auctor fringilla.
          </Typography> */}
          </DialogContent>

          <DialogActions>
            <div>
              <Button
                className={classes.buttonLogin}
                type="submit"
                variant="contained"
                fullWidth
              >
                Validate
              </Button>
            </div>
            {/* <Button autoFocus onClick={handleClose} color="primary">
            Save changes
          </Button> */}
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
