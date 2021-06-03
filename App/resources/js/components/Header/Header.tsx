import React from "react";
import './_Header.scss';

const Header: React.FC = () => {
  
    return (    
        <div className="wrapper-header">
            <a href="/">
                <h1 className="logo-header">
                    Piggy
                </h1>
            </a>
            <img src="../images/image-for-header.png" alt="piggy" className="image-header"/>
        </div>
    );
};

export default Header;