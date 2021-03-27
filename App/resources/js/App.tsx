import React from "react";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import MainSection from "./MainSection/MainSection";

const App: React.FC = () => {
    return (
    <div className="wrapper-all-app">
        <Header />
        <MainSection/>
        <Footer />
    </div>
       
    )
};
export default App;