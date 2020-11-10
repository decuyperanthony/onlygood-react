/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState } from 'react';
import {
  useDispatch,
  // useSelector,
} from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import './styles.css';
// import classNames from 'classnames';
import clsx from 'clsx';

// === action
import { setWhichTweet } from '../../store/action/post';

const useStyles = makeStyles((theme) => ({
  containerMenuItem: {
    // padding: '14px',
    // '&:hover': {
    //   cursor: 'pointer',
    // },
  },
  menuItem: {
    padding: '0.8em',
    marginBottom: '0.5em',
    color: '#828282',
    fontFamily: 'popins, sans-serif',
    fontWeight: '600',
    fontSize: '14px',
    '&:hover': {
      cursor: 'pointer',
      color: '#2F80ED',
    },
  },
}));

const menuItem = [
  {
    id: 1,
    name: 'Tweets',
    composant: 'tweet',
  },
  {
    id: 2,
    name: 'Tweets & replies',
    composant: 'Tweets & replies',
  },
  {
    id: 3,
    name: 'Medias',
    composant: 'Medias',
  },
  {
    id: 4,
    name: 'Likes',
    composant: 'Likes',
  },
];

const VerticalTabs = () => {
  const dispatch = useDispatch();
  const [activeClassId, setActiveClassId] = useState(1);
  //   const [border, setBorder] = useState('');
  const classes = useStyles();
  const handleActiveClass = (menuId, composant) => {
    setActiveClassId(menuId);
    dispatch(setWhichTweet(composant));
    console.log('composant', composant);
  };
  const verticalJSX = menuItem.map((m) => {
    let classNameMenuItem = '';
    if (m.id === activeClassId) {
      classNameMenuItem += 'activeClassName';
    }
    return (
      <div
        id="menu-item"
        key={m.id + 2343}
        onClick={() => handleActiveClass(m.id, m.composant)}
        // className={}
        className={clsx(classNameMenuItem, classes.menuItem)}
      >
        {m.name}
      </div>
    );
  });
  console.log('hello');
  return (
    <div className={classes.containerMenuItem}>
      {verticalJSX}
      {/* <div className={classes.borderLeft}>Tweets</div> */}

    </div>
  );
};

export default VerticalTabs;
