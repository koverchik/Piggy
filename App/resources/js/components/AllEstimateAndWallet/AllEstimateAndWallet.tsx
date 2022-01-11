import { observer } from 'mobx-react-lite';
import React from 'react';
import { observableUserProfile } from '../Authorization/helper';
import MainSection from '../MainSection/MainSection';
import AllEstimateMainPage from './AllEstimateMainPage/AllEstimateMainPage';
import AllWalletsMainPage from './AllWalletsMainPage/AllWalletsMainPage';
import './_AllEstimateAndWallet.scss';

const AllEstimateAndWallet: React.FC = observer(() => {
  return observableUserProfile.isSingIn ? (
    <div className="wrapper-all-estimate-wallet">
      <AllEstimateMainPage />
      <AllWalletsMainPage />
    </div>
  ) : (
    <MainSection />
  );
});
export default AllEstimateAndWallet;
