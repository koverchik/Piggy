import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import './_ListForPoints.scss';
import store from "../../../state";

const ListForPoints: React.FC = observer((props: any) => {  
   const [stateUsers, setStateUsers] = useState();     
   type UserList = {
      name: string, 
      email: string, 
      id: number,
      created_at: string,
      updated_at: string,
      email_verified_at: string};

   useEffect(() => {
      store.Wallet.requestUsersSystems().then((data: any)=>{
         store.Wallet.allDataUsersSystems = data;
         createListUser(store.Wallet.allDataUsersSystems);
      });
   }, [])    
   function createListUser (data:any, serchData: string = store.Wallet.newUser){
      const result = data.map((item: UserList, i: number) =>{         
         if(serchData === ""){
            return createTags(item, i);
         }else{
            if(((item["email"].toUpperCase()).indexOf(serchData.toUpperCase()) != -1) || ((item["name"].toUpperCase()).indexOf(serchData.toUpperCase()) != -1 )){
               return createTags(item, i);
            }  
         }
       })
      setStateUsers(result); 
   }
 
   function createTags (data: UserList, i: number){
      return(
         <div className="one-user-list-user-data" key={"user" + i}>
            <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/>
            <p>{data.name}</p></div>
            <p>{ data.email }</p>
         </div>
     )
   }        
   useEffect(() => {
      createListUser(store.Wallet.allDataUsersSystems);
   }, [store.Wallet.newUser]) 
    return (
            <div className={"list-users-data"} onClick={props.callbackClickList} >
               { stateUsers }
            </div>
            )
});
export default ListForPoints;