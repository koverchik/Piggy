import React, { useEffect, useState } from "react";
import './_AllEstimateAndWallet.scss';
import { observer } from "mobx-react-lite";
import AllEstimateMainPage from "./AllEstimateMainPage/AllEstimateMainPage";
import AllWalletsMainPage from "./AllWalletsMainPage/AllWalletsMainPage";

const AllEstimateAndWallet: React.FC = observer(() => {
  
    return (
        <div className="wrapper-all-estimate-wallet">
            <AllEstimateMainPage />
            <AllWalletsMainPage />
        </div>
    )
});
export default AllEstimateAndWallet;