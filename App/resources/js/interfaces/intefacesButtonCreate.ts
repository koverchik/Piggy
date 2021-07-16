import * as React from 'react';

interface ButtonCreate extends React.HTMLAttributes<HTMLDivElement>{
    name : string,
    image: boolean,
    srcImage?: string,
    type: "button" | "submit",
    callbackClick?: () => void,
    redirectPage?: (idPage:number) => void,

}
export default ButtonCreate;