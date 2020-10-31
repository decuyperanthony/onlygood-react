import React from 'react';
import './styles.css';

const Login = () => {
  console.log('login');
  return (
    <div className="blocpage-login">
      <main className="page-login">

        <h2>Login</h2>
        <div className="input-login">

          <form method="POST" action="/login">
            <div>
              <input type="text" name="email" id="input-email" placeholder="email" />
            </div>

            <div>
              <input type="password" name="password" id="input-password" placeholder="password" />
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
