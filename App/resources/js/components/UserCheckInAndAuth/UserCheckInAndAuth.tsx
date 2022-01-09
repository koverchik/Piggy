import React from 'react';
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import './_UserCheckInAndAuth.scss';
import Button from '../ButtonCreate/ButtonCreate';
import {
  GoogleLogin,
  GoogleLoginResponse,
  GoogleLoginResponseOffline
} from 'react-google-login';

const UserCheckInAndAuth: React.FC = observer((props: any) => {
  const responseGoogle = (
    response: GoogleLoginResponse | GoogleLoginResponseOffline
  ) => {
    console.log(response);
  };

  return (
    <div className="wrapper-form-user-reg-auth">
      <div className="form-user-reg-auth">
        <h2>{props.nameForm}</h2>
        <GoogleLogin
          clientId="420712854303-99d07k7jiqrsq58c7iv3mugs85oensd2.apps.googleusercontent.com"
          buttonText="Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
        <form>
          <div className="wrapper-input-text-user">
            <p>Введите имя</p>
            <input type="text" className="input-text-form-user" />
            <p>Введете пароль</p>
            <input type="text" className="input-text-form-user" />
            {props.repeatPassword ? (
              <div className="wrapper-reset-password">
                <p>Повторите ещё раз пароль</p>
                <input type="text" className="input-text-form-user" />
              </div>
            ) : (
              ''
            )}
          </div>
          <div className="wrapper-button-reg-auth">
            <Button {...props.buttonSend} />
          </div>
        </form>
        <div className="wrapper-footer-link">
          <p className="redirect-link">
            {props.question}
            <Link to={'/' + props.addressLink}>Кликните сюда</Link>
          </p>
          <p className="redirect-link">
            <Link to="/">На главную</Link>
          </p>
        </div>
      </div>
    </div>
  );
});
export default UserCheckInAndAuth;
