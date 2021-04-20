import React, { useEffect, useState } from "react";
import Button from "../ButtonCreate/ButtonCreate";
import './_AllEstimateAndWallet.scss';
import dataEstimate from "../../actions/RequestAllEstimate";
import axios from 'axios';

// const testCook = document.querySelector('meta[name="csrf-token"]');
// console.log(testCook);

const AllEstimateAndWallet: React.FC = () => {
    const [listEstimate, setlistEstimate] = useState([]);
         
    useEffect(() => {
        axios.post('http://localhost:8000/all-estimates', {id: 9 } ).then(response => {
 
            let list = response.data.map(( item: any, i: number ) =>{
                console.log(item['full_name']);  
                return <li  key={"listEstimate"+i}><a href="#">{item['full_name']}</a></li>
            })
             return setlistEstimate(list);
          
            },
            response => {
                console.log("error request " + response);
                let notiseError : any = <li  key={"listEstimateEmpty"}> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</li>
                return  setlistEstimate(notiseError);
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