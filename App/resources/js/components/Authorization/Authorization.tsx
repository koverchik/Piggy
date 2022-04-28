import { observer } from 'mobx-react-lite';
import React from 'react';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from 'react-router-dom';
import { saveUserInfo } from './helper';
import './_Authorization.scss';
import { useTranslation } from 'react-i18next';

const Authorization: React.FC = observer(() => {
  const history = useHistory();
  const navigateTo = () => history.push('/');
  const { t } = useTranslation();
  return (
    <div className="wrapper-form-user-reg-auth">
      <div className="user-authorization">
        <h2>{t('authorization.login-with')}</h2>
        <div className="wrapper-button-authorization">
          <GoogleLogin
            clientId="420712854303-99d07k7jiqrsq58c7iv3mugs85oensd2.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={(response) => {
              if ('accessToken' in response) {
                saveUserInfo(response);
              }
              navigateTo();
            }}
            cookiePolicy={'single_host_origin'}
          />
        </div>
      </div>
    </div>
  );
});
export default Authorization;
