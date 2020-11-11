/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import {
  useDispatch,
  useSelector,
} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import { makeStyles } from '@material-ui/core/styles';
import {
  TextField,
  Link,
  Button,
  Card,
  // InputAdornment,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { signup } from '../../store/action/signup';
// import './styles.css';

// == style
const useStyles = makeStyles({
  blocPageLogin: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    maxWidth: '500px',
    margin: 'auto',
    // alignItems: 'center',
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
  textField: {
    paddingBottom: '1em',
    // height: '40px',
  },
  buttonLogin: {
    backgroundColor: '#2F80ED',
    color: 'white',
    // marginTop: '2em',
    // marginBottom: '2em',
    // height: '40px',
  },
  // buttonForgetPwd: {
  //   marginTop: '-6em',
  //   paddingLeft: '0em',
  //   fontSize: '12px',
  // },
  // inputAdornment: {
  //   '&:hover': {
  //     cursor: 'pointer',
  //   },
  // },
});

const Signup = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  // === traitement erreur signup
  const [errorSignup, setErrorSignup] = useState('');
  const { errorAuth } = useSelector((state) => state.auth);
  // == si on a une erreur du back
  let errorRespBackendJSX;
  if (errorAuth) {
    errorRespBackendJSX = (
      <Alert
        style={{ marginBottom: '2em' }}
        severity="error"
      >
        {' '}
        {errorAuth}
      </Alert>
    );
  }
  const onSubmit = (data) => {
    setErrorSignup('');
    // == si le mdp et la confirm ne sont pas identiques
    if (data.password !== data.confirmPassword) {
      setErrorSignup(
        <Alert
          style={{ marginBottom: '2em' }}
          severity="error"
        >
          Password and confirm password are not the same
        </Alert>,
      );
    } else {
      setErrorSignup('');
      dispatch(signup({
        history,
        data,
      }));
    }
  };

  console.log(errors);
  return (
    <div className={classes.blocPageLogin}>
      <h2 style={{ color: '#2F80ED', textAlign: 'center' }}>Create your account</h2>
      <Card className={classes.cardStyle}>
        <main className="page-login">
          {errorRespBackendJSX}
          {errorSignup}
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <TextField
                error={!!errors.firstname}
                fullWidth
                variant="outlined"
              // required
                className={classes.textField}
                inputRef={
                    register({
                      required: 'Firstname is required',
                    })
                  }
                helperText={errors.firstname ? errors.firstname.message : null}
                type="text"
                label="Firstname"
                name="firstname"
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <Mail color="action" />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </div>
            <div>
              <TextField
                error={!!errors.lastname}
                fullWidth
                variant="outlined"
                className={classes.textField}
                inputRef={
                    register({
                      required: 'Lastname is required',
                    })
                  }
                helperText={errors.lastname ? errors.lastname.message : null}
                type="text"
                label="Lastname"
                name="lastname"
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <Mail color="action" />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </div>

            <div>
              <TextField
                error={!!errors.email}
                fullWidth
                variant="outlined"
              // required
                className={classes.textField}
                inputRef={
                    register({
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Wrong format',
                      },
                    })
                  }
                helperText={errors.email ? errors.email.message : null}
                type="text"
                label="email"
                name="email"
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <Mail color="action" />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </div>

            <div>
              <TextField
                variant="outlined"
                fullWidth
                className={classes.textField}
              // required
                error={!!errors.password}
                inputRef={
                  register({
                    required: 'Password is required',
                  })
                  }
                helperText={errors.password ? errors.password.message : null}
                name="password"
                type="password"
                  // id="input-with-icon-textfield"
                label="password"
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <Mail color="action" />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </div>
            <div>
              <TextField
                variant="outlined"
                fullWidth
                className={classes.textField}
              // required
                error={!!errors.confirmPassword}
                inputRef={
                  register({
                    required: 'Confirm Password is required',
                  })
                  }
                helperText={errors.confirmPassword ? errors.confirmPassword.message : null}
                name="confirmPassword"
                type="password"
                  // id="input-with-icon-textfield"
                label="Confirm your password"
                // InputProps={{
                //   endAdornment: (
                //     <InputAdornment position="end">
                //       <Mail color="action" />
                //     </InputAdornment>
                //   ),
                // }}
              />
            </div>

            <div>
              <Button
                className={classes.buttonLogin}
                type="submit"
                variant="contained"
                fullWidth
              >
                Sign up
              </Button>
            </div>

          </form>
        </main>
      </Card>
      <Card className={classes.cardStyle} style={{ textAlign: 'center' }}>
        Already sign up ?
        {' '}
        <Link href="#" style={{ color: '#2F80ED' }} onClick={() => history.push('/')}>Log-in</Link>
      </Card>
    </div>
  );
};

export default Signup;
