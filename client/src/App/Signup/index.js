import React from 'react';
import './styles.css';

const Signup = () => {
  console.log('signup');
  return (
    <div className="blocpage-login">
      <main className="page-login">
        <h2>Create Account</h2>
        <form method="POST" action="/signup">
          <div>
            <input type="text" name="firstname" id="input-firstname" placeholder="Prénom" />
          </div>

          <div>
            <input type="text" name="lastname" id="input-lastname" placeholder="Nom" />
          </div>

          <div>
            <input type="text" name="email" id="input-email" placeholder="Email" />
          </div>

          <div>
            <input type="password" name="password" id="input-password" placeholder="Mot de passe" />
          </div>

          <div>
            <input
              type="password"
              name="password_confirm"
              id="input-password-confirm"
              placeholder="Confirmation du Mot de passe"
            />
          </div>

          <div className="div-button">
            <input type="submit" value="S'inscrire" className="input-btn" />
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
