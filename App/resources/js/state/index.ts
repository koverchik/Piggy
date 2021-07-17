import GeneralData from "./GeneralData";
import Estimate from "./Estimate";
import Wallet from "./Wallet";
import СreationEditingEstimates from "./СreationEditingEstimates";
import СreationEditingWallets from "./СreationEditingWallets";
import AddNewUserWallet from "./AddNewUserWallet";

const store = {
    GeneralData: new GeneralData(),
    Estimate: new Estimate(),
    Wallet: new Wallet(),
    СreationEditingEstimates: new СreationEditingEstimates(),
    СreationEditingWallets: new СreationEditingWallets(),
    AddNewUserWallet: new AddNewUserWallet(),
};

export default store;