import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";
import './_UserCheckInAndAuth.scss';
import Button from "../ButtonCreate/ButtonCreate";
import interfacesButtonCreate from "../../interfaces/intefacesButtonCreate";

const UserCheckInAndAuth: React.FC = observer((props: any) => { 
   const [stateUser, setStateUser] = useState(false);
    const buttonProps: interfacesButtonCreate = {
        name : "Регистрация",
        image: false,
        type: "submit",
        }
   
 
    return (
      <div className="wrapper-form-user-reg-auth">
          <div className="form-user-reg-auth">
               <h2>Регистрация</h2> 
                <form>
                    <div className="wrapper-input-text-user">
                        <p>Введите имя</p>
                        <input type="text" className="input-text-form-user"/>
                        <p>Придумайте пароль</p>
                        <input type="text"className="input-text-form-user"/>
                        <p>Повторие ещё раз пароль</p>
                        <input type="text"className="input-text-form-user"/>
                    </div>
                    <div className="wrapper-button-reg-auth">
                        <Button {...buttonProps}/>
                    </div>
                </form>
                <p className="redirect-link">Уже есть аккаунт? <Link to={"/"}>Кликните сюда</Link> </p>
          </div>
      </div>
    )
});
export default UserCheckInAndAuth;