import { observer } from "mobx-react-lite";
import React from "react";
import { useParams } from "react-router-dom";
import store from "../../state";
import BurdenSharing from "./BurdenSharing/BurdenSharing";
import TableOneWallet from "./TableOneWallet/TableOneWallet";
import "./_OneWallet.scss";

const OneWallet: React.FC = observer(() => {
    const params: { id: string; name: string } = useParams();
    store.Wallet.idWallet = +params.id;

    return (
        <div className="wrapper-one-wallet">
            <div className="one-wallet">
                <div className="wrapper-header-one-wallet">
                    <h2 className="header-one-wallet">{params.name}</h2>
                    <div className="wrapper-button-edit-one-wallet">
                        <img src="../images/pensil.svg"></img>
                    </div>
                </div>
                <div className="wrapper-table-wallet">
                    <TableOneWallet />
                    <BurdenSharing />
                </div>
            </div>
        </div>
    );
});
export default OneWallet;
