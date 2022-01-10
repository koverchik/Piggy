import { observer } from 'mobx-react-lite';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import store from './../../state';
import './_Authorization.scss';

const Authorization: React.FC = observer(() => {
  const history = useHistory();
  const navigateTo = () => history.push('/');
  return (
    <div className="wrapper-form-user-reg-auth">
      <div className="user-authorization">
        <h2>{'Войти с помощью'}</h2>
        <div className="wrapper-button-authorization">
          <GoogleLogin
            clientId="420712854303-99d07k7jiqrsq58c7iv3mugs85oensd2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(response) => {
              store.UserInfo.getUserInfo(response);
              navigateTo();
            }}
            onFailure={store.UserInfo.getUserInfo}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  );
});
export default Authorization;
