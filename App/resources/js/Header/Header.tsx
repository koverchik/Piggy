import React from "react";
import './_Header.scss';

const Header: React.FC = () => {
  
    return (    
        <div className="wrapper-header">
         <h1 className="logo-header">
            Piggy
         </h1>
          <img src="../images/image-for-header.png" alt="piggy" className="image-header"/>
        </div>
    );
};

export default Header;