import React from "react";
import './_OneWallet.scss';
import TableOneWallet from "./TableOneWallet/TableOneWallet";
import BurdenSharing from "./BurdenSharing/BurdenSharing";

const OneWallet: React.FC = () => {
    return (
    <div className="wrapper-one-wallet">
        <div className="one-wallet">
            <div className="wrapper-header-one-wallet">
                <h2 className="header-one-wallet">Хоз расходы</h2>
                <div className="wrapper-button-edit-one-wallet"><img src="../images/pensil.svg"></img></div>
            </div>
            <div className="wrapper-table-wallet">
                <TableOneWallet/>
                <BurdenSharing/>
            </div>
        </div>
    </div>
       
    )
};
export default OneWallet;