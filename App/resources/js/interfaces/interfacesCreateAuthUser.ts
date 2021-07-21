import * as React from 'react';
import intefacesButton from "./intefacesButtonCreate";

interface CreateAuthUser extends React.HTMLAttributes<HTMLDivElement>{
    nameForm : string,
    repeatPassword: boolean,
    buttonSend: intefacesButton,
    question: string,
    adressLink: string,
    callbackSend(): void;
}
export default CreateAuthUser;
