/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/require-default-props */
import React, { useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import {
// useDispatch,
  useSelector,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  Avatar,
} from '@material-ui/core';
// import getUserById from '../../utils/getUserById';
import { API_URL } from '../../utils/constante';
// === composant
import VerticalTabs from './VerticalTabs';
import PostProfile from './Post';

import getPostByUserId from '../../utils/getPostByUserId';
// import getAllUsers from '../../utils/getAllUsers';
import getUserSelectedById from '../../utils/getUserSelectedById';
import getUserById from '../../utils/getUserById';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,

    // padding: '1em',
  },
  paper: {
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      paddingBottom: 0,
      paddingTop: '2em',
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
    [theme.breakpoints.down('xs')]: {
      margin: 0,
      '& > .MuiGrid-item': {
        padding: 4,
      },
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
  // buttonDesktop: {
  //   color: 'white',
  //   borderRadius: '4px',
  //   fontFamily: 'Noto Sans, sans-serif',
  //   backgroundColor: '#2F80ED',
  //   padding: '0.5em 1.5em',
  //   margin: '1em 0',
  //   border: 'none',
  //   '&:hover': {
  //     cursor: 'pointer',
  //   },
  //   [theme.breakpoints.down('sm')]: {
  //     display: 'none',
  //   },
  // },
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
    [theme.breakpoints.down('xs')]: {
      // // width: '250px',
      // marginLeft: 'auto',
      // marginRight: 'auto',
      // padding: '4px !important',
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
  buttonMobile: {
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
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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
}));

const ProfileOthers = ({ data }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  scrollTop();
  const { user, userSelected } = useSelector((state) => state.user);
  const classes = useStyles();
  console.log('data in profileOthers', data);
  console.log('userSelected', userSelected);
  useEffect(() => {
    getPostByUserId(data.id);
    getUserSelectedById(data.id);
  }, [data.id]);
  let profileJSX;
  const numberOfFollowers = userSelected.follower ? userSelected.follower.length : 0;
  const numberOfFollows = userSelected.followed ? userSelected.followed.length : 0;

  if (userSelected) {
    console.log('dataaaaaaaaaaaaa');
    // let sentenceJSX = '';
    // console.log('user', user);
    // console.log('data.followed', data.followed);

    //! follow follower ...
    let sentenceJSX = '+ follow';
    //! si tu es deja dans ses followers tu affiche ne plus suivre
    if (user.follower) {
      if (user.follower.length > 0) {
        user.follower.forEach((f) => {
          // console.log('f', f);
          // console.log('f.followed_id', f.followed_id);
          if (f.followed_id === userSelected.id) {
            sentenceJSX = 'unfollow';
          }
        });
      }
    }
    const handleFollow = () => {
      // console.log('followedId', followedId);
      axios
        .post(`${API_URL}/relationship`, {
          follower_id: userId,
          followed_id: data.id,
        })
        .then((res) => {
          console.log(res);
          // getPostByUserId(data.id);
          // getAllUsers();
          // getAllPosts();
          getUserSelectedById(data.id);
          getUserById(userId);
        })
        .catch((err) => console.trace(err));
    };
    // if (user) {

    // }
    // if (data.follower)
    profileJSX = (
      <div className={classes.root}>
        {/* PICTURE HEADER */}
        <div style={{
          backgroundImage: `url(${`${API_URL}/img/${userSelected.picture_header}`})`,
          height: '15em',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          marginBottom: '-6em',
        }}
        />
        {/* <ModalUpdatePictureHeader /> */}
        {/* <CameraAltRoundedIcon style={{ color: 'red' }} /> */}
        <Grid className={classes.containerProfilePage} container spacing={3}>
          <Avatar
            variant="rounded"
            src={`${API_URL}/img/${userSelected.picture_road}`}
            className={classes.avatar}
          />
          <Grid item xs={12} className={classes.containerInfoUser}>
            <Paper className={classes.paper}>
              <div className={classes.blocUserInformation}>
                <div className={classes.userInformation}>
                  <div>
                    <span className={classes.typoName}>
                      {userSelected.firstname}
                      {' '}
                      {userSelected.lastname}
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

                  {/* <ModalUpdateProfil /> */}
                  <div
                    onClick={handleFollow}
                    className={classes.buttonDesktop}
                  >
                    {sentenceJSX}
                  </div>

                  {/* <div className={classes.button}>Edit your profile</div> */}
                </div>
                <div className={classes.userDescription}>{userSelected.description}</div>
                {/* <ModalUpdateProfilMobile /> */}
                <div
                  onClick={handleFollow}
                  className={classes.buttonMobile}
                >
                  {sentenceJSX}
                </div>
              </div>
            </Paper>
          </Grid>
          <Grid item xs={12} md={3}>
            <Paper className={classes.paperVerticalTabs}>
              <VerticalTabs userSelecteId={data.id} />
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

export default ProfileOthers;

ProfileOthers.propTypes = {
  data: PropTypes.shape(
    PropTypes.shape({
      id: PropTypes.number,
      firstname: PropTypes.string,
      lastname: PropTypes.string,
      email: PropTypes.string,
    }),
  ),
};
