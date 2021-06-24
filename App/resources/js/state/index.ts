import GeneralData from "./GeneralData";
import Estimate from "./Estimate";
import Wallet from "./Wallet";

const store = {
    GeneralData: new GeneralData(),
    Estimate: new Estimate(),
    Wallet: new Wallet(),
};

export default store;