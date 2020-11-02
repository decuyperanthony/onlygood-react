import React from 'react';
import {
  useDispatch,
  //  useSelector
} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
// import { Mail } from '@material-ui/icons/';

import {
  TextField,
  // InputAdornment,
  Button,
  Input,
  FormControl,
  InputLabel,
  FormHelperText,
  Card,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { login } from '../../store/action/auth';

import './styles.css';

// == style
const useStyles = makeStyles({
  // containerLogin: {
  //   height: '100vh',
  //   maxWidth: '450px',
  //   margin: 'auto',
  // },
  // alertErrorAuthStyle: {
  //   marginBottom: '2em',
  //   marginTop: '-2em',
  // },
  // logo: {
  //   height: '5em',
  //   width: 'auto',
  //   borderRadius: '50%',
  //   boxShadow: '0 3px 5px 2px rgba(75, 84, 111, .3)',
  //   paddingTop: '1em',
  // },
  // gridLogin: {
  //   width: '100%',
  // },
  // cardStyles: {
  //   margin: '-6em 1em 1em 1em',
  //   padding: '0 0.5em',
  // },
  // cardHeaderStyles: {
  //   backgroundColor: '#263153',
  //   border: 0,
  //   borderRadius: 3,
  //   boxShadow: '0 3px 5px 2px rgba(75, 84, 111, .3)',
  //   color: 'white',
  //   height: 130,
  //   padding: '15px 10px 10px 10px',
  //   margin: '0px 30px 0 30px',
  //   position: 'relative',
  //   top: '36px',
  //   textAlign: 'center',
  // },
  // cardContent: {
  //   paddingTop: '12em',
  // },
  textField: {
    paddingBottom: '3em',
  },
  buttonValidate: {
    backgroundColor: '#008080',
    color: 'white',
    marginTop: '2em',
    marginBottom: '2em',
    height: '40px',
  },
  buttonSignup: {
    backgroundColor: 'white',
    color: '#008080',
    marginTop: '2em',
    marginBottom: '2em',
    height: '40px',
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

const Login = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log('data', data);
    dispatch(login({
      history,
      data,
    }));
  };
  console.log(errors);
  return (
    <Card className="blocpage-login">
      <main className="page-login">

        <h2 style={{ color: '#008080' }}>Login</h2>
        <div className="input-login">

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <div>
              <input
                type="text"
                placeholder="Email"
                id="input-email"
                name="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
            </div> */}

            <TextField
              error={!!errors.email}
              required
              className={classes.textField}
              inputRef={
                    register({
                      required: 'votre email est requis',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Mauvais format',
                      },
                    })
                  }
              helperText={errors.email ? errors.email.message : null}
              type="text"
              fullWidth
              id="standard-ok"
                  // id="input-with-icon-textfield"
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

            <FormControl
              className={classes.textField}
              required
              fullWidth
              error={!!errors.password}
            >
              <InputLabel
                htmlFor="standard-adornment-password"
              >
                mot de passe
              </InputLabel>
              <Input
                id="standard-adornment-password"
                name="password"
                type="password"
                // type={values.showPassword ? 'text' : 'password'}
                // onChange={handleChange('password')}
                inputRef={
                      register({
                        required: 'le mot de passe est requis',
                      })
                    }
                // endAdornment={(
                //   <InputAdornment
                //     className={classes.inputAdornment}
                //     position="end"
                //     aria-label="toggle password visibility"
                //     onClick={handleClickShowPassword}
                //     onMouseDown={handleMouseDownPassword}
                //   >
                //     {values.showPassword ?
                // <Visibility color="action" /> : <VisibilityOff color="action" />}
                //   </InputAdornment>
                //     )}
              />
              <FormHelperText
                id="component-error-text"
              >
                {errors.password ? errors.password.message : null}
              </FormHelperText>
            </FormControl>

            {/* <div>
              <input
                type="password"
                name="password"
                id="input-password"
                placeholder="password"
                ref={register({
                  required: 'le mot de passe est requis',
                })}
              />
            </div> */}

            <Button
              className={classes.buttonValidate}
              type="submit"
              variant="contained"
              fullWidth
            >
              Valider
            </Button>

            {/* <div className="div-button">
              <input type="submit" value="Se Connecter" className="input-btn" />
            </div> */}
          </form>
        </div>

      </main>
      <main className="signup">
        <h2>Hello, Friend!</h2>
        <p className="para-signup">Enter your personal details and start journey with us</p>

        <Button
          variant="contained"
          fullWidth
          className={classes.buttonSignup}
          onClick={() => history.push('/signup')}
        >
          Sign up

        </Button>

      </main>
    </Card>
  );
};

export default Login;
