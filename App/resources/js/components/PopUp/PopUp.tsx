import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import './_PopUp.scss';
import Button from "../ButtonCreate/ButtonCreate";
import ListForPoints from "./ListForPoint/ListForPoints";
import AccessList from "./AccessList/AccessList";

const PopUp: React.FC = observer((props: any) => { 
   const [stateListUser, setStateListUser] = useState(false);
    return (
      <div className="wrapper-for-background" onClick={props.closeClick}>
         <div className="wrapper-pop-up" onClick={(event)=> {event.stopPropagation()}}>
            <div className="wrapper-header-create-new-name">
               <p>{props.kind} </p> 
               <img src="../images/cancel_white.svg" alt="close" className="close-img" onClick={props.closeClick}/>
            </div>
            <div className="wrapper-for-name">
               <p>{props.textMessage}</p>
               <input   type="text" 
                        value={ props.name } 
                        onChange={ props.onChangeFunction }
                        onClick={ ()=> setStateListUser(!stateListUser) }
                        />
               {props.listUser != undefined && stateListUser? <ListForPoints { ...props.listUser } setList={ ()=> setStateListUser(!stateListUser) }/> : ""}
               {props.accessList != undefined ? <AccessList { ...props.accessList }/> : ""}
            </div>
            <div className="wrapper-for-button">
               <Button {...props.button}/>
            </div>
         </div>
      </div>
    )
});
export default PopUp;