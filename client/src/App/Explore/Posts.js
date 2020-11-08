import React from 'react';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  TextField,
  InputAdornment,
} from '@material-ui/core';
import Moment from 'react-moment';
// === component
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import RepeatIcon from '@material-ui/icons/Repeat';
import TurnedInNotIcon from '@material-ui/icons/TurnedInNot';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import CropOriginalIcon from '@material-ui/icons/CropOriginal';

import Avatar from './Avatar';
// === fake picture
import picture from '../../image/exemple.jpg';
// === icon

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // padding: '1em',
  },
  paper: {
    padding: theme.spacing(1),
    // padding: '1em',
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  headerPost: {
    display: 'flex',
    alignItems: 'center',
  },
  author: {
    fontFamily: 'Poppins, sans serif',
    fontWeight: '500',
    fontSize: '16px',
    color: 'black',
  },
  date: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    fontSize: '12px',
    color: '#BDBDBD',
  },
  textContent: {
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '400',
    fontSize: '16px',
    color: '#4F4F4F',
    // marginLeft: '1em',
  },
  picture: {
    width: '100%',
  },
  containerImpression: {
    display: 'flex',
    listStyleType: 'none',
    justifyContent: 'space-between',
    borderBottom: '1px solid #F2F2F2',
    borderTop: '1px solid #F2F2F2',
    padding: '0.5em 2em',
    fontFamily: 'Noto Sans, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    color: '#4F4F4F',
  },
  impression: {
    display: 'flex',
    padding: '0.2em 1em',
    margin: '-0.2em -1em',
    '&:hover': {
      backgroundColor: '#F2F2F2',
      cursor: 'pointer',
    },
  },
  containerComments: {
    display: 'flex',
  },
  inputComment: {
    marginTop: '1em',
    marginLeft: '0.5em',
    width: '100%',
    '&div': {
      display: 'flex',
      alignItems: 'center',
    },
    '& input': {
      padding: '0 10px',
      height: '30px',
      display: 'flex',
      alignItems: 'center',
    },
  },
  inputAdornment: {
    color: '##BDBDBD',
    '&:hover': {
      backgroundColor: '#F2F2F2',
      cursor: 'pointer',
    },
  },

}));

const Posts = () => {
  const classes = useStyles();
  const { posts } = useSelector((state) => state.post);
  let postsJSX;
  if (posts) {
    postsJSX = posts.map((p) => {
      console.log('hello');
      //   let pictureJSX;
      //   if (p.picture) {
      const pictureJSX = <img className={classes.picture} src={picture} alt="post" />;
      //   }
      return (
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            {/* ----- AUTHOR & PICTURE ----- */}
            <header className={classes.headerPost}>
              <Avatar />
              <div>
                <div className={classes.author}>
                  {p.author.firstname}
                  {' '}
                  {p.author.lastname}
                </div>
                <span className={classes.date}>
                  <Moment fromNow>{p.created_at}</Moment>
                </span>
              </div>
            </header>
            {/* ----- CONTENT & PICTURE ----- */}
            <main>
              <p className={classes.textContent}>{p.content}</p>
              {pictureJSX}
            </main>
            {/* ----- IMPRESSIONS ----- */}
            <main>
              <div className={classes.containerImpression}>
                <div className={classes.impression}>
                  <ChatBubbleOutlineIcon style={{ marginRight: '0.5em' }} />
                  Comment
                </div>
                <div className={classes.impression}>
                  <RepeatIcon style={{ marginRight: '0.5em' }} />
                  Retweet
                </div>
                <div className={classes.impression}>
                  <FavoriteBorderIcon style={{ marginRight: '0.5em' }} />
                  Like
                </div>
                <div className={classes.impression}>
                  <TurnedInNotIcon style={{ marginRight: '0.5em' }} />
                  Save
                </div>
              </div>
            </main>
            {/* ----- COMMENTS ----- */}
            <footer className={classes.containerComments}>
              <Avatar />
              <TextField
                className={classes.inputComment}
                variant="outlined"
                placeholder="Tweet your reply"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      className={classes.inputAdornment}
                    // position="end"
                    // aria-label="toggle password visibility"
                    // onClick={handleClickShowPassword}
                    // onMouseDown={handleMouseDownPassword}
                    >
                      <CropOriginalIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </footer>
          </Paper>
        </Grid>
      );
    });
  }
  return (
    <>
      {postsJSX}
    </>
  );
};

export default Posts;
