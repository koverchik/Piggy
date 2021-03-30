import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
// import MainSection from "./MainSection/MainSection";
// import AllEstimateAndWallet from "./AllEstimateAndWallet/AllEstimateAndWallet";
import AllEstimate from "./AllEstimate/AllEstimate";


const App: React.FC = () => {
    return (
    <div className="wrapper-all-app">
        <Header />
        <AllEstimate/>
        <Footer />
    </div>
    )
};
export default App;