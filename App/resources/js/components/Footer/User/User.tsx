import React from 'react';
import './_User.scss';
import { Link } from 'react-router-dom';
import store from '../../../state';
import { observer } from 'mobx-react-lite';
import { observableUserProfile } from '../../Authorization/helper';

const Footer: React.FC = observer(() => {
  return observableUserProfile.isSingIn ? (
    <Link to="/" className="enter-in-system">
      <img
        src={observableUserProfile.imageUrl}
        alt="piggy"
        className="image-user"
        width={50}
        height={50}
      />
      <p>{observableUserProfile.givenName}</p>
    </Link>
  ) : (
    <Link to="/authorization" className="enter-in-system">
      <img
        src="../images/unknown-user.svg"
        alt="piggy"
        className="image-unknown-user"
      />
      <p>Войти</p>
    </Link>
  );
});

export default Footer;
