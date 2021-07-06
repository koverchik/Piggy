import * as React from 'react';

interface ButtonCreate extends React.HTMLAttributes<HTMLDivElement>{
    name : string,
    type: "button" | "submit",
    callbackClick: () => void;
    
    
}
export default ButtonCreate;