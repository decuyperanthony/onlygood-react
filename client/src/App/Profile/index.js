/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Avatar,
} from '@material-ui/core';
import getUserById from '../../utils/getUserById';
import { API_URL } from '../../utils/constante';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: '1em',
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  // card: {
  //   display: 'flex',
  //   [theme.breakpoints.down('xs')]: {
  //     width: '250px',
  //   },
  // },
  containerProfilePage: {
    maxWidth: '1000px',
    margin: 'auto',
  },
  // pictureHeader: {

  // },
  avatar: {
    height: '5em',
    width: '5em',
    border: '2px solid white',
    marginBottom: '-2em',
    marginLeft: '2em',
  },

}));

const Profile = () => {
  const classes = useStyles();
  const userId = JSON.parse(localStorage.getItem('userId'));
  useEffect(() => {
    getUserById(userId);
  }, [userId]);
  const { user } = useSelector((state) => state.user);
  console.log('user', user);
  console.log('user', user.follower);
  console.log('user', user.followed);

  let profileJSX;
  if (user) {
    profileJSX = (
      <div className={classes.root}>
        {/* PICTURE HEADER */}
        <div style={{
          backgroundImage: `url(${`${API_URL}/img/${user.picture_header}`})`,
          height: '15em',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '-6em',
        }}
        />
        <Grid className={classes.containerProfilePage} container spacing={3}>
          <Avatar
            variant="rounded"
            src={`${API_URL}/img/${user.picture_road}`}
            className={classes.avatar}
          />
          <Grid item xs={12}>
            <Paper className={classes.paper}>
              <span>
                {user.firstname}
                {' '}
                {user.lastname}
              </span>
              <span>
                {/* <span>{user.followed.length}</span> */}
                Following
              </span>
              <span>
                {/* <span>{user.follower.length}</span> */}
                Followers
              </span>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper className={classes.paper}>
              hello
            </Paper>
          </Grid>
          <Grid item xs={9}>
            <Paper className={classes.paper}>
              Aurevoir
            </Paper>
          </Grid>
        </Grid>

      </div>
    );
  }

  return (
    <>
      {profileJSX}
    </>
  );
};

export default Profile;

// Profile.propTypes = {
//   data: PropTypes.shape(
//     PropTypes.shape({
//       firstname: PropTypes.string,
//       lastname: PropTypes.string,
//       email: PropTypes.string,
//     }),
//   ),
// };
