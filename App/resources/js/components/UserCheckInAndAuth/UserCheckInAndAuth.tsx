import { observer } from 'mobx-react-lite';
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../ButtonCreate/ButtonCreate';
import './_UserCheckInAndAuth.scss';

const UserCheckInAndAuth: React.FC = observer((props: any) => {
  return (
    <div className="wrapper-form-user-reg-auth">
      <div className="form-user-reg-auth">
        <h2>{props.nameForm}</h2>
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
