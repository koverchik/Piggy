import axios from 'axios';
import {Link} from "react-router-dom";
import React from "react";

 const requestEstimates = () => {

   axios.post('http://localhost:8000/all-estimates', {id: 9 } ).then(response => {
 
      let list = response.data.map(( item: any, i: number ) =>{
        return (<li key={"listEstimate"+i}>
                   <Link to={"/estimate/" + item['names_estimates_id']}>{item['full_name']}</Link>
                  </li>)
          })
     return list;
    
      },
      response => {
          console.log("error request " + response);
          let notiseError : any = <li  key={"listEstimateEmpty"}> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</li>
          return notiseError;
       }
      )
      

};

export default requestEstimates;