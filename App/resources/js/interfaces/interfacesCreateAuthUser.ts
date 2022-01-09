import * as React from "react";
import interfacesButton from "./interfacesButtonCreate";

interface CreateAuthUser extends React.HTMLAttributes<HTMLDivElement> {
    nameForm: string;
    repeatPassword: boolean;
    buttonSend: interfacesButton;
    question: string;
    addressLink: string;
    callbackSend(): void;
}
export default CreateAuthUser;
