import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import './_ListForPoints.scss';
import store from "../../../state";

const ListForPoints: React.FC = observer((props: any) => {  
   const [stateUsers, setStateUsers] = useState();     
  console.log(props);
  
   useEffect(() => {
      store.Wallet.requestUsersSystems().then((data: any)=>{     
          const result = data.map((item: any, i: number) =>{
               return(
               <div className="one-user-list-user-data" key={"user" + i}>
                  <div  className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p>{item.name}</p></div>
                  <p>{ item.email }</p>
               </div>
              )
          })
          setStateUsers(result); 
      });
   }, [])                     
    return (
            <div className={ props.availability ? "list-users-data": "list-users-data hide-list" }>
               { stateUsers }
            </div>
            )
});
export default ListForPoints;