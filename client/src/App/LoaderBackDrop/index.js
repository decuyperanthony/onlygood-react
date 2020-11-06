import React from 'react';
import {
  useSelector,
} from 'react-redux';
// import PropTypes from 'prop-types';

import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
    display: 'flex',
    flexDirection: 'column',
  },
  message: {
    marginTop: '.5em',
    padding: '0 3em',
    fontSize: '20px',
  },
}));

export default function LoaderBackDrop() {
  // == redux
  const {
    loaderOpen, message,
  } = useSelector((state) => state.loader);
  const classes = useStyles();

  return (
    <div>
      <Backdrop
        className={classes.backdrop}
        open={loaderOpen}
      // open
      // onClick={handleClose}
      >
        <CircularProgress color="inherit" />
        <div className={classes.message}>
          <p style={{ textAlign: 'center' }}>{message}</p>
        </div>
      </Backdrop>
    </div>
  );
}

// LoaderBackDrop.propTypes = {
//   // eslint-disable-next-line react/require-default-props
//   message: PropTypes.string,
// };
