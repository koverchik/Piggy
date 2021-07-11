import React from "react";
import './_ButtonCreate.scss';

const ButtonCreate:React.FC = (props: any) => {
    
    return (    
    <div className="button-main"> 
        {props.image ? <img src={props.srcImage}></img> : ""}
        <input
            className="button-add-new-item " 
            type={props.type}
            value={props.name} 
            onClick={()=>{const idPage = props.callbackClick();
            if(idPage != undefined) { 
                idPage.then((data:any) => props.redirectPage(data));
               }
            }}
            />  
     </div>
    );
};

export default ButtonCreate;