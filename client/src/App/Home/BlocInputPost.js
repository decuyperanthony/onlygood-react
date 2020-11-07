import React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import {
  // Grid,
  // Paper,
  TextField,
  IconButton,
  // Link,
  // Button,
  // Card,
  // InputAdornment,
} from '@material-ui/core';

// == icon
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PublicIcon from '@material-ui/icons/Public';
// == component
import ImageAvatars from './Avatar';

// == style
const useStyles = makeStyles((theme) => ({
  headerInputPost: {
    color: '#4F4F4F',
    fontFamily: 'popins, sans-serif',
    fontWeight: '600',
    fontSize: '12px',
    paddingBottom: '0.5em',
    borderBottom: '1px solid #E0E0E0',
  },
  inputContainer: {
    paddingTop: '0.5em',
    display: 'flex',
    // marginBottom: '1em',
  },
  input: {
    width: '100%',
    border: 'none',
  },
  footerInputPost: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '-1em',
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
  //   root: {
  //     flexGrow: 1,
  //     padding: '1em',
  //   },
  //   paper: {
  //     padding: theme.spacing(2),
  //     textAlign: 'center',
  //     color: theme.palette.text.secondary,
  //   },
  //   blocHomepage: {

//   },
//   cardStyle: {
//     margin: '0.5em',
//     padding: '1em',
//     width: 'auto',
//     backgroundColor: 'white',
//     // margin: '0.5em 1em',
//     // // padding: '0 .5em !important',
//     // padding: '1em',
//     borderRadius: '4px',
//     boxShadow: '0 3px 5px 2px rgba(75, 84, 111, .3)',
//   },
}));

const BlocPost = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  // const history = useHistory();
  const dispatch = useDispatch();
  const onSubmit = (data) => {
    console.log('data', data);
    // dispatch(login({
    //   history,
    //   data,
    // }));
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <div className={classes.headerInputPost}>Tweet something</div>
        <div className={classes.inputContainer}>
          <ImageAvatars />
          <TextField
            variant="outlined"
            error={!!errors.post}
            inputRef={
              register({
                required: 'Post can not be empty',
                // pattern: {
                //   value: /^\S+@\S+$/i,
                //   message: 'Wrong format',
                // },
              })
            }
            helperText={errors.post ? errors.post.message : null}
            name="post"
            placeholder="What's happening ?"
            className={classes.input}
            type="text"
          />
        </div>
        <div className={classes.footerInputPost}>
          <div>
            <IconButton>
              <CropOriginalIcon style={{ color: '#2F80ED' }} />
            </IconButton>
            <IconButton>
              <PublicIcon style={{ color: '#2F80ED' }} />
            </IconButton>
          </div>
          <button type="submit" className={classes.button}>
            Tweet
          </button>
        </div>
      </div>
    </form>
  );
};

export default BlocPost;
