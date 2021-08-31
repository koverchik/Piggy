import GeneralData from './GeneralData';
import Estimate from './Estimate';
import Wallet from './Wallet';
import CreationEditingEstimates from './CreationEditingEstimates';
import CreationEditingWallets from './CreationsEditingWallets';
import AddNewUserWallet from './AddNewUserWallet';

const store = {
  GeneralData: new GeneralData(),
  Estimate: new Estimate(),
  Wallet: new Wallet(),
  CreationEditingEstimates: new CreationEditingEstimates(),
  CreationEditingWallets: new CreationEditingWallets(),
  AddNewUserWallet: new AddNewUserWallet()
};

export default store;
