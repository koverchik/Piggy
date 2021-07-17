import * as React from 'react';

interface intefacesAccessOptions extends React.HTMLAttributes<HTMLDivElement>{
    availability: boolean,
    callbackClickAccess: (event: Event) => void,
    }
export default intefacesAccessOptions;
