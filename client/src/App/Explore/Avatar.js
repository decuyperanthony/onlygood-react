/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
// import avatarAntho from '../../image/avatar.jpg';
import { API_URL } from '../../utils/constante';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function ImageAvatars({ pictureSrc }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* <Avatar alt="Antho Sharp" src=`{pictureSrc}` /> */}
      <Avatar alt="Antho Sharp" src={`${API_URL}/img/${pictureSrc}`} />
    </div>
  );
}

ImageAvatars.propTypes = {
  // eslint-disable-next-line react/require-default-props
  pictureSrc: PropTypes.string,
};
