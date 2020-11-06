import React from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Brightness7Icon from '@material-ui/icons/Brightness7';
//! == Drawer
import Drawer from '../Drawer';
import { toggleDarkmode } from '../../../store/action/theme';
import { disconnect } from '../../../store/action/auth';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const history = useHistory();
  const classes = useStyles();
  const dispatch = useDispatch();
  const { darkmodeBoolean } = useSelector((state) => state.theme);
  const handleToggleDarkmode = () => {
    console.log('clique');
    dispatch(toggleDarkmode(!(darkmodeBoolean)));
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <Drawer />
          </IconButton>
          <IconButton
            onClick={handleToggleDarkmode}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Brightness7Icon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News
          </Typography>
          <Button
            color="inherit"
            onClick={() => {
              dispatch(disconnect());
              history.push('/login');
            }}
            // onClick={() => history.push('/login')}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
