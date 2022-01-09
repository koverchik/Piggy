import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import UserCheckInAndAuth from "../UserCheckInAndAuth/UserCheckInAndAuth";
import createAuthUser from "../../interfaces/interfacesCreateAuthUser";

const Registration: React.FC = observer((props: any) => {
    const dataProps: createAuthUser = {
        nameForm: "Регистрация",
        repeatPassword: true,
        buttonSend: {
            name: "Регистрация",
            image: false,
            type: "submit",
        },
        question: "Уже есть аккунт?",
        addressLink: "аuthentication",
        callbackSend: () => {
            console.log("hello");
        },
    };
    return <UserCheckInAndAuth {...dataProps} />;
});
export default Registration;
