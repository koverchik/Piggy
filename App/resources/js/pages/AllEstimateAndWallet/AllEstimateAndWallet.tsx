import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { observableUserProfile } from '../../components/Authorization/helper';
import { ListEstimateWallet } from '../../components/ListEstimateWallet/ListEstimateWallet';
import MainSection from '../../components/MainSection/MainSection';
import PopUp from '../../components/PopUp/PopUp';
import store from '../../state';
import AllEstimateMainPage from './AllEstimateMainPage/AllEstimateMainPage';
import AllWalletsMainPage from './AllWalletsMainPage/AllWalletsMainPage';
import './_AllEstimateAndWallet.scss';

const AllEstimateAndWallet: React.FC = observer(() => {
  const [error, setError] = useState(true);
  const [listEstimateData, setlistEstimateData] = useState();
  const [listWalletData, settWalletData] = useState();

  useEffect(() => {
    store.GeneralData.allEstimates().then((data: any) => {
      if (data !== 'Error') {
        store.GeneralData.allDataEstimate = data;
        setlistEstimateData(data);
      } else {
        setError(false);
      }
      store.GeneralData.allWallets().then((data: any) => {
        if (data !== 'Error') {
          store.GeneralData.allDataWallets = data;
          settWalletData(data);
        } else {
          setError(false);
        }
      });
    });
  }, []);

  return observableUserProfile.isSingIn ? (
    <div className="wrapper-all-estimate-wallet">
      {error ? (
        <>
          <ListEstimateWallet
            listData={listEstimateData}
            patch={'estimate'}
            nameSection={'сметы'}
            fnAddNewItem={store.CreationEditingEstimates.createNewEstimate}
          />
          <ListEstimateWallet
            listData={listWalletData}
            patch={'wallet'}
            nameSection={'кошельки'}
            fnAddNewItem={store.CreationEditingWallets.createNewWallet}
          />
          <AllWalletsMainPage />
        </>
      ) : (
        <div> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</div>
      )}
    </div>
  ) : (
    <MainSection />
  );
});
export default AllEstimateAndWallet;