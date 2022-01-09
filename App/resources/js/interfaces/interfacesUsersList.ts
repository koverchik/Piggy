import * as React from 'react';

interface interfacesUsersList extends React.HTMLAttributes<HTMLDivElement> {
  availability: boolean;
  callbackClickList: (event: Event) => void;
}
export default interfacesUsersList;
