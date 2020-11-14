/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { useHistory } from 'react-router';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ExploreIcon from '@material-ui/icons/Explore';
import BookmarkIcon from '@material-ui/icons/Bookmark';

const useStyles = makeStyles((theme) => ({
  text: {
    padding: theme.spacing(2, 2, 0),
  },
  paper: {
    paddingBottom: 50,
  },
  list: {
    marginBottom: theme.spacing(2),
  },
  subheader: {
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    top: 'auto',
    bottom: 0,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  link: {
    fontFamily: 'popins, sans-serif',
    fontWeight: '500',
    fontSize: '14px',
    color: '#828282',
    margin: '0 2em',
    '&:hover': {
      color: '#2F80ED',
      // borderBottom: '2px #2F80ED solid',
      // paddingBottom: '19px',
    },
  },
  activeClassLink: {
    color: '#2F80ED',
    borderBottom: '2px #2F80ED solid',
    paddingBottom: '19px',
  },
  // grow: {
  //   flexGrow: 1,
  // },
  // fabButton: {
  //   position: 'absolute',
  //   zIndex: 1,
  //   top: -30,
  //   left: 0,
  //   right: 0,
  //   margin: '0 auto',
  // },
  // activeClassName: {
  //   color: '#2F80ED',
  // },
}));

const menuItem = [
  {
    id: 123,
    label: 'Home',
    icon: <HomeIcon />,
    path: '/dashboard',
  },
  {
    id: 124,
    label: 'Explore',
    icon: <ExploreIcon />,
    path: '/dashboard/explore',
  },
  {
    id: 125,
    label: 'Bookmarks',
    icon: <BookmarkIcon />,
    path: '/dashboard/bookmarks',
  },
];

export default function BottomAppBar() {
  const history = useHistory();
  const classes = useStyles();
  // const [itemId, setItemId] = React.useState(124);
  // const handleClick = (id, path) => {
  //   console.log('itemId', id);
  //   setItemId(id);
  //   history.push(path);
  // };
  // const menuItemJSX = menuItem.map((m) => {
  //   let className = '';
  //   if (m.id === itemId) {
  //     className = classes.activeClassName;
  //   }
  //   return (
  // <IconButton
  //   key={m.id}
  //   onClick={() => handleClick(m.id, m.path)}
  //   className={className}
  //   // edge="start"
  //   color="inherit"
  //   aria-label="open drawer"
  // >
  //   {m.icon}
  // </IconButton>
  //   );
  // });
  const navLinkJSX = menuItem.map((r) => (
    <NavLink
      exact
      key={r.label}
      to={`${r.path}`}
      // to={r.route}
      className={classes.link}
      activeClassName={classes.activeClassLink}
    >

      <IconButton
        // key={m.id}
        // onClick={() => handleClick(m.id, m.path)}
        // className={className}
        // edge="start"
        color="inherit"
        aria-label="open drawer"
      >
        {r.icon}
      </IconButton>
    </NavLink>
  ));
  return (
    <>
      <AppBar position="fixed" color="primary" className={classes.appBar}>
        <div className={classes.containerNavlink}>
          {navLinkJSX}
        </div>
        {/* {menuItemJSX} */}
      </AppBar>
    </>
  );
}
