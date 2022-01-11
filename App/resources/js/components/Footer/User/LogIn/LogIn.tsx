import React from 'react';
import { Link } from 'react-router-dom';
import './../_User.scss';

const LogIn: React.FC = () => {
  return (
    <div className="wrapper-user-profile">
      <Link to="/authorization" className="enter-in-system">
        <img
          src="../images/unknown-user.svg"
          alt="piggy"
          className="image-unknown-user"
        />
        <p>Войти</p>
      </Link>
    </div>
  );
};

export default LogIn;
