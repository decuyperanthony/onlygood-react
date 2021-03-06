import React from 'react';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import {
  // useDispatch,
  useSelector,
} from 'react-redux';
// import avatarPicture from '../../../image/avatar.jpg';
import { API_URL } from '../../../utils/constante';

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: '$ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}))(Badge);

// const SmallAvatar = withStyles((theme) => ({
//   root: {
//     width: 11,
//     height: 11,
//     border: `2px solid ${theme.palette.background.paper}`,
//   },
// }))(Avatar);

const useStyles = makeStyles((theme) => ({
  root: {
    marginRight: '-1.5em',
    display: 'flex',
    // height: '20px',
    // width: '20px',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function BadgeAvatars() {
  const classes = useStyles();
  const { userData } = useSelector((state) => state.auth);
  return (
    <div className={classes.root}>
      <StyledBadge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src={`${API_URL}/img/${userData.picture_road}`} />
      </StyledBadge>
    </div>
  );
}
