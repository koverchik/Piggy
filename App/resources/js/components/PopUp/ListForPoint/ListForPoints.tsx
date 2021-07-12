import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import './_ListForPoints.scss';
import store from "../../../state";


const ListForPoints: React.FC = observer((props: any) => {  
   const [stateUsers, setStateUsers] = useState();     
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
               <div className="list-users-data">
                  { stateUsers }
               </div>
    )
});
export default ListForPoints;