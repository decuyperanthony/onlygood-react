import React from 'react';
import {
  useDispatch,
  //  useSelector
} from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useHistory } from 'react-router';
import { useForm } from 'react-hook-form';
import './styles.css';

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log('data', data);
    // dispatch(login({
    //   history,
    //   data,
    // }));
  };
  console.log(errors);
  return (
    <div className="blocpage-login">
      <main className="page-login">
        <h2>Create Account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>

          <div>
            <input
              type="text"
              name="firstname"
              id="input-firstname"
              placeholder="prénom"
              ref={register({
                required: 'le prénom de passe est requis',
              })}
            />
          </div>

          <div>
            <input
              type="text"
              name="lastname"
              id="input-lastname"
              placeholder="Nom"
              ref={register({
                required: 'le nom est requis',
              })}
            />
          </div>

          <div>
            <input
              type="text"
              placeholder="Email"
              id="input-email"
              name="email"
              ref={register({
                required: 'l email est requis',
                pattern: /^\S+@\S+$/i,
              })}
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

          <div>
            <input
              type="password"
              name="password_confirm"
              id="input-password-confirm"
              placeholder="Confirmation du Mot de passe"
              ref={register({
                required: 'la confirmation du mot de passe est requis',
              })}
            />
          </div>

          <div>
            <input
              type="password"
              name="password_confirm"
              id="input-password-confirm"
              placeholder="Confirmation du Mot de passe"
            />
          </div>

        </form>
      </main>
      <main className="signup">
        <h2>Welcome Back!</h2>
        <p className="para-signup">To keep connected with us please login with your personal info</p>
        <a href="/login">
          <input className="btn--signup" value="Sign in" />
        </a>
      </main>
    </div>
  );
};

export default Signup;
