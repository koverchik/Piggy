import React, { useEffect, useState } from "react";
import Button from "../ButtonCreate/ButtonCreate";
import './_AllEstimateAndWallet.scss';
import axios from 'axios';
import {Link} from "react-router-dom";
import { observer } from "mobx-react-lite";


const AllEstimateAndWallet: React.FC = observer(() => {
  
    const [listEstimate, setlistEstimate] = useState([]);
    const [listWallet, setlistWallet] = useState([]);
    
         
    useEffect(() => {
        axios.post(process.env.MIX_APP_URL_FOR_TEST + 'all-estimates', {id: 9 } ).then(response => {
            const list = response.data.map(( item: any, i: number ) =>{
          
                
              return (  <li key={"listEstimate"+i}>
                           <Link to={"/estimate-" + item['names_estimates_id']}>{item['full_name']}</Link>
                        </li>)
                })
           setlistEstimate(list);
          
            },
            response => {
                const notiseError : any = <li  key={"listEstimateEmpty"}> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</li>
                setlistEstimate(notiseError);
             }
            )
        
            axios.post(process.env.MIX_APP_URL_FOR_TEST + 'all-wallets', {id: 9 } ).then(response => {
                const list = response.data.map(( item: any, i: number ) =>{                    
                    
                  return (  
                        <li key={"listWallet"+i}>
                            <Link to={"/wallet-" + item['names_wallets_id']+ '-' + item['names_wallet']['name']}>{item['names_wallet']['name']}</Link>
                        </li>
                        )
                    })
                setlistWallet(list);
              
                },
                response => {
                    console.log("error request " + response);
                    const notiseError : any = <li  key={"listWalletEmpty"}> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</li>
                    setlistWallet(notiseError);
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
                    {listWallet}
                 </ul>
                <Button/>
            </div>
    </div>
       
    )
});
export default AllEstimateAndWallet;