import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import MainSection from "./MainSection/MainSection";
import AllEstimateAndWallet from './AllEstimateAndWallet/AllEstimateAndWallet';
import AllEstimate from './AllEstimate/AllEstimate';
import OneEstimate from './OneEstimate/OneEstimate';
import OneWallet from './OneWallet/OneWallet';
import Registration from './Registration/Registration';
import Authentication from './Authentication/Authentication';

import { observer } from 'mobx-react-lite';

const App: React.FC = observer(() => {
  return (
    <div className="wrapper-all-app">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={AllEstimateAndWallet} />
          <Route exact path="/registration" component={Registration} />
          <Route exact path="/аuthentication" component={Authentication} />
          <Route path="/estimate-:id" component={OneEstimate} />
          <Route path="/one-estimate" component={AllEstimate} />
          <Route path="/wallet-:id-:name" component={OneWallet} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
});
export default App;
