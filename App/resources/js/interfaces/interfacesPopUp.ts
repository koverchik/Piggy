import * as React from 'react';
import intefacesButton from "./intefacesButtonCreate";
import interfacesUsersList from "./interfacesUsersList";

interface interfacesPopUp extends React.HTMLAttributes<HTMLDivElement>{
    name: string,
    textMessage: string,
    kind: string,
    listUser?: interfacesUsersList,
    accessOptions: boolean,
    closeClick: () => void,
    button: intefacesButton,
    onChangeFunction(event: Event| null): void,
    }
export default interfacesPopUp;
