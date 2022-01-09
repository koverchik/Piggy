import * as React from "react";

interface interfacesAccessOptions extends React.HTMLAttributes<HTMLDivElement> {
    availability: boolean;
    callbackClickAccess: (event: Event) => void;
}
export default interfacesAccessOptions;
