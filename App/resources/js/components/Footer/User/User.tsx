import React from 'react';
import './_User.scss';
import { Link } from 'react-router-dom';
import store from '../../../state';
import { observer } from 'mobx-react-lite';

const Footer: React.FC = observer(() => {
  console.log('isSingIn', store.UserInfo.isSingIn);

  return store.UserInfo.isSingIn ? (
    <Link to="/" className="enter-in-system">
      <img
        src={store.UserInfo.imageUrl}
        alt="piggy"
        className="image-unknown-user"
      />
      <p>{store.UserInfo.givenName}</p>
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
