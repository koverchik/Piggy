import React from 'react';
import './_Footer.scss';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <div className="wrapper-footer">
      <Link to="/authorization" className="enter-in-system">
        <img
          src="../images/unknown-user.svg"
          alt="piggy"
          className="image-unknown-user"
        />
        <p>Войти</p>
      </Link>
      <div className="links-info">
        <a href="#">Правила</a>
        <a href="#">О правах</a>
        <a href="mailto:koverchik.o@gmail.com?subject=Вопрос по Piggy">
          Связаться
        </a>
      </div>
    </div>
  );
};

export default Footer;
