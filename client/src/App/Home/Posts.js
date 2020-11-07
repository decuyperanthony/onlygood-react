import React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
} from '@material-ui/core';
import Moment from 'react-moment';
// === component
import Avatar from './Avatar';
// === fake picture
import picture from '../../image/exemple.jpg';

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
    marginLeft: '1em',
  },

}));

const Posts = () => {
  const classes = useStyles();
  const { posts } = useSelector((state) => state.post);
  let postsJSX;
  if (posts) {
    postsJSX = posts.map((p) => (
      <Grid item xs={9}>
        <Paper className={classes.paper}>
          <header className={classes.headerPost}>
            <Avatar />
            <div>
              <div className={classes.author}>
                {p.user.firstname}
                {' '}
                {p.user.lastname}
              </div>
              <span className={classes.date}>
                <Moment fromNow>{p.created_at}</Moment>
              </span>
            </div>
          </header>

          <p className={classes.textContent}>{p.content}</p>
        </Paper>
      </Grid>
    ));
  }
  return (
    <>
      {postsJSX}
    </>
  );
};

export default Posts;
