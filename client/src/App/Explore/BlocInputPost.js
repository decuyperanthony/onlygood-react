/* eslint-disable no-restricted-syntax */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
// import axios from 'axios';
import {
// useDispatch,
  useSelector,
} from 'react-redux';
import { useForm } from 'react-hook-form';

import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  IconButton,
} from '@material-ui/core';

// == icon
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PublicIcon from '@material-ui/icons/Public';
import { API_URL } from '../../utils/constante';
// == component
import ImageAvatars from './Avatar';

import getAllPosts from '../../utils/getAllPosts';
import getPostByUserId from '../../utils/getPostByUserId';
// == style
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  container: {
    // marginBottom: '1em',
  },
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
  inputFile: {
    width: '0.1px',
    height: '0.1px',
    opacity: 0,
    overflow: 'hidden',
    position: 'absolute',
    zIndex: -1,
  },
  inputLabel: {
    '&:hover': {
      cursor: 'pointer',
    },
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
  const onSubmitComment = (data) => {
    console.log('data', data);
    const myFormData = new FormData();
    myFormData.append('content', data.post);
    myFormData.append('image', data.imagePost[0]);
    myFormData.append('app_users_id', userId);
    for (const value of myFormData.values()) {
      console.log('value', value);
    }

    fetch(`${API_URL}/post/`, {
      method: 'POST',
      body: myFormData,
    }).then((res) => {
      console.log('res', res);
      setInputValue('');
      getAllPosts();
      getPostByUserId(userId);
    }).catch((error) => console.trace(error));
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };
  return (
    <div className={classes.container}>
      <form onSubmit={handleSubmit(onSubmitComment)}>
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
            <IconButton style={{ marginTop: '5px' }}>
              <input
                className={classes.inputFile}
                type="file"
                placeholder="image"
                name="imagePost"
                id="imagePost"
                ref={register({
                  required: false,
                  // pattern: /^\S+@\S+$/i,
                })}
              />
              {/* <div>
                <input type="submit" name="addPost" />
              </div> */}
              <label
                className={classes.inputLabel}
                htmlFor="imagePost"
              >
                <CropOriginalIcon style={{ color: '#2F80ED' }} />
              </label>
            </IconButton>
            <IconButton>
              <PublicIcon style={{ color: '#2F80ED' }} />
            </IconButton>
          </div>
          <button type="submit" className={classes.button}>
            Tweet
          </button>
        </div>
      </form>
    </div>
  );
};

export default BlocPost;
