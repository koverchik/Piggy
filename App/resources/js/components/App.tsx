import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
// import MainSection from "./MainSection/MainSection";
import AllEstimateAndWallet from "./AllEstimateAndWallet/AllEstimateAndWallet";
import AllEstimate from "./AllEstimate/AllEstimate";
import OneEstimate from "./OneEstimate/OneEstimate";
import OneWallet from "./OneWallet/OneWallet";

const App: React.FC = () => {


    return (
    <div className="wrapper-all-app">
        <Header />
          <Router>
            <Switch>
                <Route exact path="/" component={AllEstimateAndWallet} />
                <Route path="/estimate" component={AllEstimate} />
                <Route path="/one-estimate" component={OneEstimate} />
                <Route path="/wallet" component={OneWallet} />
            </Switch>
        </Router>
        <Footer />
    </div>
    )
};
export default App;