import React from 'react';
import './styles.css';

const NavBar = () => {
  console.log('navbar');
  return (
    <header className="topbar">
      <a href="/" className="topbar-logo">Only Good</a>
      <nav className="topbar-nav">
        <a href="/login">Se connecter</a>
        <a href="/signup">S&apos;inscrire</a>
        {/* <a href="/" class="active">Accueil</a>
            <a href="/userPage">Mon profil</a>
            <a href="/historique">Historique</a>
            <a href="#">Evénement</a>
            <a href="/logout">Se déconnecter</a> */}
      </nav>
    </header>
  );
};

export default NavBar;
