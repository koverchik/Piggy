import React from "react";
import './_ButtonCreate.scss';

const ButtonCreate:React.FC = (props: any) => {
   
    return (    
    <div className="button-main">
        <input 
            className="button-add-new-item " 
            type={props.type}
            value={props.name} 
            onClick={ props.callbackClick }
            />  
     </div>
    );
};

export default ButtonCreate;