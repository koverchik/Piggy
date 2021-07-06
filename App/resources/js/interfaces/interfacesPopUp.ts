import * as React from 'react';

interface interfacesPopUp extends React.HTMLAttributes<HTMLDivElement>{
    name: string,
    kind: string,
    closeClick: () => void;
    onChangeFunction(event: Event| null): void;
    callbackClick: () => Promise<string | void>;
}

export default interfacesPopUp;
