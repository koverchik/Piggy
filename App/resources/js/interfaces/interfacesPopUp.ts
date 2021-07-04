import * as React from 'react';

interface interfacesPopUp extends React.HTMLAttributes<HTMLDivElement>{
    name: string,
    closeClick: () => void;
}
export default interfacesPopUp;
