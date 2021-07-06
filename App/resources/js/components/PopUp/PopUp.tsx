import React from "react";
import { observer } from "mobx-react-lite";
import './_PopUp.scss';
import Button from "../ButtonCreate/ButtonCreate";
import interfacesButtonCreate from "../../interfaces/intefacesButtonCreate";

const PopUp: React.FC = observer((props: any) => {
  
   const buttonName: interfacesButtonCreate = {name: "Создать",
                               type: "submit",
                               callbackClick: props.callbackClick}; 
                            
    return (
      <div className="wrapper-for-background" onClick={props.closeClick}>
         <div className="wrapper-pop-up" onClick={(event)=> {event.stopPropagation()}}>
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