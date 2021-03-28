import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
// import MainSection from "./MainSection/MainSection";
import AllEstimateAndWallet from "./AllEstimateAndWallet/AllEstimateAndWallet";

const App: React.FC = () => {
    return (
    <div className="wrapper-all-app">
        <Header />
        <AllEstimateAndWallet/>
        <Footer />
    </div>
       
    )
};
export default App;