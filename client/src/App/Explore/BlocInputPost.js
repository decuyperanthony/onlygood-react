import React, { useState } from 'react';
import axios from 'axios';
import {
// useDispatch,
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
import { API_URL } from '../../utils/constante';
// == component
import ImageAvatars from './Avatar';

import getAllPosts from '../../utils/getAllPosts';

// == style
// eslint-disable-next-line no-unused-vars
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
}));

const BlocPost = () => {
  const classes = useStyles();
  const { register, handleSubmit, errors } = useForm();
  const userId = JSON.parse(localStorage.getItem('userId'));
  // const user = JSON.parse(localStorage.getItem('user'));
  const { userData } = useSelector((state) => state.auth);
  // const history = useHistory();
  // const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const onSubmit = (data) => {
    console.log('data', data);
    axios
      .post(`${API_URL}/post`, {
        content: data.post,
        app_users_id: userId,
      }, {
        withCredentials: true,
      })
      .then((res) => {
        setInputValue('');
        console.log('res', res);
        getAllPosts();
        // setValue('');
      })
      .catch((err) => {
        console.log(err);
      });
    // dispatch(login({
    //   history,
    //   data,
    // }));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={classes.root}>
        <div className={classes.headerInputPost}>Tweet something</div>
        <div className={classes.inputContainer}>
          <ImageAvatars pictureSrc={userData.picture_road} />
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
            value={inputValue}
            onChange={handleInputChange}
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
