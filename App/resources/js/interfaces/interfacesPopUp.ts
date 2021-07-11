import * as React from 'react';

interface interfacesPopUp extends React.HTMLAttributes<HTMLDivElement>{
    name: string,
    kind: string,
    image: boolean,
    closeClick: () => void,
    onChangeFunction(event: Event| null): void,
    callbackClick: () => Promise<string | void>,
    redirectPage?: (idPage:number) => void,
    }

export default interfacesPopUp;
