import React from 'react';
import Header from './Header/Header';
import Footer from './Footer/Footer';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import MainSection from "./MainSection/MainSection";
import { MainPage } from '../pages/MainPage';
import AllEstimate from './AllEstimate/AllEstimate';
import { Estimate } from '../pages/EstimatePage';
import { OneWallet } from '../pages/WalletPage';
import Registration from './Registration/Registration';
import Authentication from './Authentication/Authentication';
import '../../js/locales/index';
import { observer } from 'mobx-react-lite';
import Authorization from './Authorization/Authorization';
import DevTools from 'mobx-react-devtools';

const App: React.FC = observer(() => {
  return (
    <div className="wrapper-all-app">
      <DevTools />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={MainPage} />
          {/* <Route exact path="/registration" component={Registration} />
          <Route exact path="/authentication" component={Authentication} /> */}
          <Route exact path="/authorization" component={Authorization} />
          <Route path="/estimate-:id" component={Estimate} />
          <Route path="/one-estimate" component={AllEstimate} />
          <Route path="/wallet-:id" component={OneWallet} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
});
export default App;
