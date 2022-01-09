import React from 'react';
import User from './User/User';
import './_Footer.scss';

const Footer: React.FC = () => {
  return (
    <div className="wrapper-footer">
      <User />
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
