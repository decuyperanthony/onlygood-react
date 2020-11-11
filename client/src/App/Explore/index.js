import React from 'react';
import {
// useDispatch,
// useSelector,
} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Paper,
  // Link,
  // Button,
  // Card,
  // InputAdornment,
} from '@material-ui/core';

// === component
import BlocPost from './BlocInputPost';
import Posts from './Posts';
import WhoToFollow from './WhoToFollow';

// == style
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    padding: '1em',
  },
  paper: {
    padding: theme.spacing(2),
    // textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  blocHomepage: {

  },
  cardStyle: {
    margin: '0.5em',
    padding: '1em',
    width: 'auto',
    backgroundColor: 'white',
    // margin: '0.5em 1em',
    // // padding: '0 .5em !important',
    // padding: '1em',
    borderRadius: '4px',
    boxShadow: '0 3px 5px 2px rgba(75, 84, 111, .3)',
  },
}));

const Explore = () => {
  const classes = useStyles();
  // const history = useHistory();
  // const dispatch = useDispatch();
  return (

    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <Paper className={classes.paper}>
            <BlocPost />
          </Paper>
          <Posts />
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>
            <WhoToFollow />
          </Paper>
        </Grid>
      </Grid>
    </div>

  );
};

export default Explore;
