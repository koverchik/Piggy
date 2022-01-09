import GeneralData from './GeneralData';
import Estimate from './Estimate';
import Wallet from './Wallet';
import CreationEditingEstimates from './CreationEditingEstimates';
import CreationEditingWallets from './CreationEditingWallets';
import AddNewUserWallet from './AddNewUserWallet';
import UserInfo from './UserInfo';

const store = {
  GeneralData: new GeneralData(),
  Estimate: new Estimate(),
  Wallet: new Wallet(),
  CreationEditingEstimates: new CreationEditingEstimates(),
  CreationEditingWallets: new CreationEditingWallets(),
  AddNewUserWallet: new AddNewUserWallet(),
  UserInfo: new UserInfo()
};

export default store;
