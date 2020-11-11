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
  const onSubmit = (data) => {
    console.log('data', data);
    const formdata = new FormData();
    formdata.append('content', data.post);
    formdata.append('image', data.image[0]);
    formdata.append('app_users_id', userId);
    for (const value of formdata.values()) {
      console.log('value', value);
    }

    // fetch(`${API_URL}/post`, {
    //   method: 'POST',
    //   body: formdata,
    // }).then((res) => {
    //   console.log('res', res);
    //   // console.log('res', res);
    //   setInputValue('');
    //   getAllPosts();
    //   // getUserData(userId);
    //   // getUserById(userId);
    //   // getAllPosts();
    //   // handleClose();
    // }).catch((error) => console.trace(error));
    //* autre test
    // axios.post('upload_file', formData, {
    //   headers: {
    //     'Content-Type': 'multipart/form-data',
    //   },
    // });
    //! --- ---- --- ça marchait
    axios
      .post(`${API_URL}/post`, {
        formdata,
      }, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
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
    //! --- ---- --- ça marchait
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
    //! fin -------------------
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
      <div className={classes.container}>
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
              <input
                // className={classes.inputFile}
                type="file"
                placeholder="image"
                name="image"
                // id="image"
                ref={register({
                  required: false,
                  // pattern: /^\S+@\S+$/i,
                })}
              />
              {/* <label
                className={classes.inputLabel}
                htmlFor="picture-comment"
              >
                <CropOriginalIcon style={{ color: '#2F80ED' }} />

              </label> */}
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
