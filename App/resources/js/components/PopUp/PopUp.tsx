import React from "react";
import { observer } from "mobx-react-lite";
import './_PopUp.scss';
import ButtonCreate from "../ButtonCreate/ButtonCreate";

const PopUp: React.FC = observer(() => {

    return (
    <div className="wrapper-for-background">
      <div className="wrapper-pop-up">
         <div className="wrapper-header-create-new-name">
             <p>Создание сметы </p> 
             <img src="../images/cancel_white.svg" alt="close" className="close-img"/>
         </div>
         <div className="wrapper-for-name">
            <p>Введите название </p>
            <input type="text"/>
         </div>
         <div className="wrapper-for-button">
            <ButtonCreate/>
         </div>
      </div>
    </div>
    )
});
export default PopUp;