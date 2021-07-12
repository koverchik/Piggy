import * as React from 'react';
import intefacesButton from "./intefacesButtonCreate";

interface interfacesPopUp extends React.HTMLAttributes<HTMLDivElement>{
    name: string,
    kind: string,
    closeClick: () => void,
    button: intefacesButton,
    onChangeFunction(event: Event| null): void,
    }
export default interfacesPopUp;
