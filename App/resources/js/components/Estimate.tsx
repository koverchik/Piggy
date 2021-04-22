import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";

import AllEstimateAndWallet from "./AllEstimateAndWallet/AllEstimateAndWallet";

import OneEstimate from "./OneEstimate/OneEstimate";



const App: React.FC = () => {


    return (
    <div className="wrapper-all-app">
        <Header />
        <OneEstimate/>
        <div>Hello!</div>
          <Router>
            <Switch>
                <Route exact path="/" component={AllEstimateAndWallet} />
         </Switch>
        </Router>
        <Footer />
    </div>
    )
};
export default App;