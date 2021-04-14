import React from "react";
import './_Footer.scss';

const Footer: React.FC = () => {
   
    return (  
        <div className="wrapper-footer">
            <a href="#" className="enter-in-system">
                <img src="../images/unknown-user.svg" alt="piggy" className="image-unknow-user" />
                <p>Войти</p>
            </a>
            <div className="links-info">
                <a href="#">
                    Правила
                </a>
                <a href="#">
                    О правах
                </a>
                <a href="mailto:koverchik.o@gmail.com?subject=Вопрос по Piggy">
                    Связаться
                </a>
            </div>

        </div>
        
    );
};

export default Footer;