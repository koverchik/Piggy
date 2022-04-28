import { observer } from 'mobx-react-lite';
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { Link } from 'react-router-dom';
import { observableUserProfile } from '../../../Authorization/helper';
import { logout } from '../helper';
import '../_User.scss';

const UserProfile: React.FC = observer(() => {
  return (
    <div className="wrapper-user-profile">
      <Link to="/" className="enter-in-system">
        <img
          src={observableUserProfile.imageUrl}
          alt="user"
          className="image-user"
          width={35}
          height={35}
        />
        <p>{observableUserProfile.givenName}</p>
      </Link>

      <GoogleLogout
        clientId="420712854303-99d07k7jiqrsq58c7iv3mugs85oensd2.apps.googleusercontent.com"
        icon={false}
        render={() => (
          <button className="button-log-out" onClick={logout}>
            {'Выйти'}
          </button>
        )}
      ></GoogleLogout>
    </div>
  );
});

export default UserProfile;
