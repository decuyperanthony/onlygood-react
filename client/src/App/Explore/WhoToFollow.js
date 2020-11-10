/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable array-callback-return */
import React from 'react';
import axios from 'axios';

import {
// useDispatch,
  useSelector,
} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
// Grid,
// Paper,
//   TextField,
//   IconButton,
// Link,
// Button,
// Card,
// InputAdornment,
} from '@material-ui/core';

// == icon
import PersonAddIcon from '@material-ui/icons/PersonAdd';
// import RemoveIcon from '@material-ui/icons/Remove';
import { API_URL } from '../../utils/constante';
// == component
import ImageAvatars from './Avatar';

import getAllUsers from '../../utils/getAllUsers';

// == style
// eslint-disable-next-line no-unused-vars
const useStyles = makeStyles((theme) => ({
  headerWhoToFollow: {
    color: '#4F4F4F',
    fontFamily: 'popins, sans-serif',
    fontWeight: '600',
    fontSize: '12px',
    paddingBottom: '0.5em',
    borderBottom: '1px solid #E0E0E0',
  },
  containerUserInformation: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  userNameAndFollowers: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  userName: {
    color: 'black',
    fontFamily: 'popins, sans-serif',
    fontWeight: '500',
    fontSize: '16px',
  },
  followers: {
    color: '#828282',
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    fontSize: '12px',
  },

  button: {
    display: 'flex',
    // justifyContent: 'space-between',
    alignItems: 'center',
    color: 'white',
    borderRadius: '4px',
    fontFamily: 'Noto Sans, sans-serif',
    backgroundColor: '#2F80ED',
    padding: '0.3em 1em',
    margin: '1em 0',
    border: 'none',
    '&:hover': {
      cursor: 'pointer',
    },
  },
}));

const WhoToFollow = () => {
  const classes = useStyles();
  const { users } = useSelector((state) => state.user);
  const userId = JSON.parse(localStorage.getItem('userId'));
  // console.log('users', users);
  const handleFollow = (followedId) => {
    // console.log('followedId', followedId);
    axios
      .post(`${API_URL}/relationship`, {
        follower_id: userId,
        followed_id: followedId,
      })
      .then((res) => {
        console.log(res);
        getAllUsers();
        // getAllPosts();
      })
      .catch((err) => console.trace(err));
  };
  let usersJSX;
  if (users) {
    // eslint-disable-next-line consistent-return
    usersJSX = users.map((u, index) => {
      // console.log('personne', u);
      let buttonFollowers = (
        <>
          <PersonAddIcon style={{ marginRight: '0.2em' }} />
          follow
        </>
      );
      u.followed.forEach((fwd) => {
        // console.log('fwd', fwd);
        if (fwd.follower_id === userId) {
          buttonFollowers = (
            <>
              {/* <RemoveIcon style={{ marginRight: '0.2em' }} /> */}
              following
            </>
          );
        }
      });
      while (index < 4) {
        return (
          <div key={u.id + 70} className={classes.containerUserInformation}>
            <div style={{ display: 'flex' }}>
              <ImageAvatars pictureSrc={u.picture_road} />
              <div className={classes.userNameAndFollowers}>
                <div className={classes.userName}>
                  {u.firstname}
                  {' '}
                  {u.lastname}
                </div>
                <div className={classes.followers}>
                  {u.followed.length}
                  {' '}
                  followers
                </div>
              </div>
            </div>
            <div
              onClick={() => handleFollow(u.id)}
              className={classes.button}
            >
              {buttonFollowers}
              {/* <PersonAddIcon style={{ marginRight: '0.2em' }} /> */}

            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className={classes.root}>
      <div className={classes.headerWhoToFollow}>Who to follow</div>
      {usersJSX}
    </div>
  );
};

export default WhoToFollow;
