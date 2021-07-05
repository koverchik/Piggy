import React from "react";
import { observer } from "mobx-react-lite";
import './_PopUp.scss';
import Button from "../ButtonCreate/ButtonCreate";

const PopUp: React.FC = observer((props: any) => {
   const buttonName: object = {name: "Создать",
                               type: "submit"}; 
    return (
      <div className={"wrapper-for-background"}>
         <div className="wrapper-pop-up">
            <div className="wrapper-header-create-new-name">
               <p>Создание {props.kind} </p> 
               <img src="../images/cancel_white.svg" alt="close" className="close-img" onClick={props.closeClick}/>
            </div>
            <div className="wrapper-for-name">
               <p>Введите название </p>
               <input   type="text" 
                        value={ props.name } 
                        onChange={ props.onChangeFunction }
                        />
            </div>
            <div className="wrapper-for-button">
               <Button {...buttonName}/>
            </div>
         </div>
      </div>
    )
});
export default PopUp;