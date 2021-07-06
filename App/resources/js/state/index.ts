import GeneralData from "./GeneralData";
import Estimate from "./Estimate";
import Wallet from "./Wallet";
import СreationEditingEstimates from "./СreationEditingEstimates";
import СreationEditingWallets from "./СreationEditingWallets";

const store = {
    GeneralData: new GeneralData(),
    Estimate: new Estimate(),
    Wallet: new Wallet(),
    СreationEditingEstimates: new СreationEditingEstimates(),
    СreationEditingWallets: new СreationEditingWallets(),
};

export default store;