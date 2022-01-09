import { observer } from 'mobx-react-lite';
import React from 'react';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';
import './_Authorization.scss';

const Authorization: React.FC = observer(() => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
    console.log(process.env.GOOGLE_SING_IN);
  };

  return (
    <div className="wrapper-form-user-reg-auth">
      <div className="form-user-reg-auth">
        <h2>{'Войти с помощью'}</h2>
        <GoogleLogin
          clientId="420712854303-99d07k7jiqrsq58c7iv3mugs85oensd2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    </div>
  );
});
export default Authorization;
