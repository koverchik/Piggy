import * as React from 'react';

interface interfacesUsersList extends React.HTMLAttributes<HTMLDivElement>{
    availability: boolean,
    callbackClickInput: () => void,
    }
export default interfacesUsersList;
