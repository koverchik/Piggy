import React, { useEffect, useState } from "react";
import Button from "../ButtonCreate/ButtonCreate";
import './_AllEstimateAndWallet.scss';
import axios from 'axios';
import {Route, Link} from "react-router-dom";

const AllEstimateAndWallet: React.FC = () => {
  
    const [listEstimate, setlistEstimate] = useState([]);
         
    useEffect(() => {
        
        axios.post('http://localhost:8000/all-estimates', {id: 9 } ).then(response => {
 
            let list = response.data.map(( item: any, i: number ) =>{
              return (  <li key={"listEstimate"+i}>
                           <Link to={"/estimate-" + item['names_estimates_id']}>{item['full_name']}</Link>
                        </li>)
                })
           setlistEstimate(list);
          
            },
            response => {
                console.log("error request " + response);
                let notiseError : any = <li  key={"listEstimateEmpty"}> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</li>
                setlistEstimate(notiseError);
             }
            )

    }, []);

    return (
    <div className="wrapper-all-estimate-wallet">
         <div className="wapper-estimate">
                <p className="header-blok-view">Сметы</p>
                <ul className="list-estimate">
                    {listEstimate}
                </ul>
                <Button/>
            </div>
            <div className="wapper-wallet">
                <p className="header-blok-view">Кошелеки</p>
                <ul className="list-wallet">
                    <li><a href="#">Хоз расходы</a></li>
                    <li><a href="#">Холодильник</a></li>
                    <li><a href="#">Подарки</a></li>
                 </ul>
                <Button/>
            </div>
    </div>
       
    )
};
export default AllEstimateAndWallet;