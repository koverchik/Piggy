import React, { useEffect, useState } from "react";
import Button from "../ButtonCreate/ButtonCreate";
import './_AllEstimateAndWallet.scss';
import dataEstimate from "../../actions/RequestAllEstimate";
import axios from 'axios';

const AllEstimateAndWallet: React.FC = () => {
    const [markers, setMarkers] = useState([]);
    const id = 3;

    useEffect(() => {
        console.log("Hello!");
        axios.post('http://localhost:8000/all-estimates', id).then(response => {
            //do stuff with response if ok   
            console.log(response);          
            },
            response => {
            //do stuff about error
            })
    }, []);

    return (
    <div className="wrapper-all-estimate-wallet">
         <div className="wapper-estimate">
                <p className="header-blok-view">Сметы</p>
                <ul className="list-estimate">
                    <li><a href="#">День рождения</a></li>
                    <li><a href="#">Новый год</a></li>
                    <li><a href="#">8 марта</a></li>
                    <li><a href="#">Майские</a></li>
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