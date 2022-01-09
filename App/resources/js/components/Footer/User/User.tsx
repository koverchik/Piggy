import React from 'react';
import './_User.scss';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <Link to="/authorization" className="enter-in-system">
      <img
        src="../images/unknown-user.svg"
        alt="piggy"
        className="image-unknown-user"
      />
      <p>Войти</p>
    </Link>
  );
};

export default Footer;
