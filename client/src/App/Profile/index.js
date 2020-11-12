/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
// import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Avatar,
} from '@material-ui/core';
import getUserById from '../../utils/getUserById';
import { API_URL } from '../../utils/constante';
// === composant
import VerticalTabs from './VerticalTabs';
import PostProfile from './Post';
import ModalUpdateProfil from './ModalUpdateProfil';
import ModalUpdateProfilMobile from './ModalUpdateProfilMobile';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    // padding: '1em',
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
    },

    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  // card: {
  //   display: 'flex',

  // },
  containerProfilePage: {
    maxWidth: '960px',
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      // width: '250px',
      margin: '0',
      width: 'auto',
    },
  },
  dispayNoneDownXS: {
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  // pictureHeader: {

  // },
  avatar: {
    height: '8em',
    width: '8em',
    border: '2px solid white',
    marginBottom: '-5em',
    marginLeft: '2em',
    [theme.breakpoints.down('sm')]: {
      // width: '250px',
      marginLeft: 'auto',
      marginRight: 'auto',
      marginTop: '-7em',
    },
  },
  blocUserInformation: {
    marginLeft: '12em',
    [theme.breakpoints.down('sm')]: {
      // width: '250px',
      marginLeft: '0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
  },
  userInformation: {
    display: 'flex',
    // marginLeft: '8em',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  typoName: {
    color: '#333333',
    fontFamily: 'popins, sans-serif',
    fontWeight: '600',
    fontSize: '24px',
    marginRight: '1em',
    [theme.breakpoints.down('sm')]: {
      display: 'block',
      marginRight: '0',
    },
  },
  typoFollow: {
    fontFamily: 'popins, sans-serif',
    fontWeight: '500',
    fontSize: '12px',
    marginRight: '1em',
    [theme.breakpoints.down('sm')]: {
      // display: 'block',
      marginRight: '0',
    },
  },
  typoNumberOfFollow: {
    fontFamily: 'popins, sans-serif',
    fontWeight: '600',
    fontSize: '12px',
    marginRight: '1em',
  },
  buttonDesktop: {
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
    [theme.breakpoints.down('sm')]: {
      display: 'none',
    },
  },
  userDescription: {
    // display: 'flex',
    color: '#828282',
    // marginLeft: '8em',
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    fontSize: '18px',
    // marginRight: '1em',
  },
  containerInfoUser: {
    [theme.breakpoints.down('sm')]: {
      // // width: '250px',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      marginTop: '-0.5em',
    },
  },
  containerFollowFollower: {
    [theme.breakpoints.down('sm')]: {
      dislay: 'flex',
      justifyContent: 'center',
    },
  },
  paperVerticalTabs: {
    padding: 0,
  },
}));

const Profile = () => {
  const classes = useStyles();
  const userId = JSON.parse(localStorage.getItem('userId'));
  useEffect(() => {
    getUserById(userId);
  }, [userId]);
  const { user } = useSelector((state) => state.user);

  let profileJSX;
  if (user.id === userId) {
    const numberOfFollowers = user.follower.length;
    const numberOfFollows = user.followed.length;
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
          <Grid item xs={12} className={classes.containerInfoUser}>
            <Paper className={classes.paper}>
              <div className={classes.blocUserInformation}>
                <div className={classes.userInformation}>
                  <div>
                    <span className={classes.typoName}>
                      {user.firstname}
                      {' '}
                      {user.lastname}
                    </span>
                    <div className={classes.containerFollowFollower}>
                      <span className={classes.typoFollow}>
                        {/* <span>{user.followed.length}</span> */}
                        {numberOfFollowers}
                        {' '}
                        <span className={classes.typoNumberOfFollow}>
                          Following
                        </span>
                      </span>
                      <span className={classes.typoFollow}>
                        {/* <span>{user.follower.length}</span> */}
                        {numberOfFollows}
                        {' '}
                        <span className={classes.typoNumberOfFollow}>
                          Followers
                        </span>
                      </span>
                    </div>
                  </div>
                  <ModalUpdateProfil />
                  {/* <div className={classes.button}>Edit your profile</div> */}
                </div>
                <div className={classes.userDescription}>{user.description}</div>
                <ModalUpdateProfilMobile />
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paperVerticalTabs}>
              <VerticalTabs />
            </Paper>
          </Grid>
          <Grid item xs={12} md={9}>
            {/* <Paper className={classes.paper}> */}
            <PostProfile />
            {/* </Paper> */}
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
// { lessonsFiltered.length > 0 ? (<>{lessonsJSX}</>) : <Loading />; }

// Profile.propTypes = {
//   data: PropTypes.shape(
//     PropTypes.shape({
//       firstname: PropTypes.string,
//       lastname: PropTypes.string,
//       email: PropTypes.string,
//     }),
//   ),
// };
