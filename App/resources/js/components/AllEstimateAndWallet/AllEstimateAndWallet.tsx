import { observer } from 'mobx-react-lite';
import React from 'react';
import AllEstimateMainPage from './AllEstimateMainPage/AllEstimateMainPage';
import AllWalletsMainPage from './AllWalletsMainPage/AllWalletsMainPage';
import './_AllEstimateAndWallet.scss';

const AllEstimateAndWallet: React.FC = observer(() => {
  return (
    <div className="wrapper-all-estimate-wallet">
      <AllEstimateMainPage />
      <AllWalletsMainPage />
    </div>
  );
});
export default AllEstimateAndWallet;
