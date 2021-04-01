import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
// import MainSection from "./MainSection/MainSection";
// import AllEstimateAndWallet from "./AllEstimateAndWallet/AllEstimateAndWallet";
// import AllEstimate from "./AllEstimate/AllEstimate";
// import OneEstimate from "./OneEstimate/OneEstimate";
import OneWallet from "./OneWallet/OneWallet";


const App: React.FC = () => {
    return (
    <div className="wrapper-all-app">
        <Header />
        <OneWallet/>
        <Footer />
    </div>
    )
};
export default App;