import React from 'react';
import { User } from './User/User';
import './_Header.scss';

export const Header: React.FC = () => {
  return (
    <div className="wrapper-header">
      <a href="/">
        <h1 className="logo-header">Piggy</h1>
      </a>
      <User />
    </div>
  );
};
