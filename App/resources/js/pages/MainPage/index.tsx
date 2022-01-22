import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { observableUserProfile } from '../../components/Authorization/helper';
import { ListEstimateWallet } from '../../components/ListEstimateWallet/ListEstimateWallet';
import MainSection from '../../components/MainSection/MainSection';
import store from '../../state';
import { ResponseListNamesEstimateWallet } from '../../state/StateTypes';
import './_style.scss';

export const MainPage: React.FC = observer(() => {
  const [error, setError] = useState(true);
  const [listEstimateData, setlistEstimateData] = useState<
    ResponseListNamesEstimateWallet[]
  >();
  const [listWalletData, settWalletData] = useState<
    ResponseListNamesEstimateWallet[]
  >();

  useEffect(() => {
    store.GeneralData.allEstimates().then((data) => {
      if (typeof data !== 'string') {
        setlistEstimateData(data);
      } else {
        setError(false);
      }
      store.GeneralData.allWallets().then((data) => {
        if (typeof data !== 'string') {
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
        </>
      ) : (
        <div> Упс, что-то пошло не так попробуйте перезагрузить стараницу.</div>
      )}
    </div>
  ) : (
    <MainSection />
  );
});
