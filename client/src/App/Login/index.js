import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';

import { login } from '../../store/action/auth';

import './styles.css';

const Login = () => {
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
    <div className="blocpage-login">
      <main className="page-login">

        <h2>Login</h2>
        <div className="input-login">

          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Email"
                id="input-email"
                name="email"
                ref={register({ required: true, pattern: /^\S+@\S+$/i })}
              />
            </div>

            <div>
              <input
                type="password"
                name="password"
                id="input-password"
                placeholder="password"
                ref={register({
                  required: 'le mot de passe est requis',
                })}
              />
            </div>

            <div className="div-button">
              <input type="submit" value="Se Connecter" className="input-btn" />
            </div>
          </form>
        </div>

      </main>
      <main className="signup">
        <h2>Hello, Friend!</h2>
        <p className="para-signup">Enter your personal details and start journey with us</p>
        <a href="/signup">
          <input className="btn--signup" value="Sign up" />
        </a>
      </main>
    </div>
  );
};

export default Login;
