import React from "react";
import Button from "../ButtonCreate/ButtonCreate";
import './_AllEstimateAndWallet.scss';

const AllEstimateAndWallet: React.FC = () => {
    return (
    <div className="wrapper-all-estimate-wallet">
         <div className="wapper-estimate">
                <p className="header-blok-view">Смета</p>
                <ul className="list-estimate">
                    <li><a href="#">День рождения</a></li>
                    <li><a href="#">Новый год</a></li>
                    <li><a href="#">8 марта</a></li>
                    <li><a href="#">Майские</a></li>
                </ul>
                <Button/>
            </div>
            <div className="wapper-wallet">
                <p className="header-blok-view">Кошелек</p>
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