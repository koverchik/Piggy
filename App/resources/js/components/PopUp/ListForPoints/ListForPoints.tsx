import React from "react";
import { observer } from "mobx-react-lite";
import './_ListForPoints.scss';

const ListForPoints: React.FC = observer((props: any) => {                            
    return (
               <div className="list-users-data">
                  <div className="one-user-list-user-data">
                     <div  className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
                  <div className="one-user-list-user-data">
                     <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
                  <div className="one-user-list-user-data">
                     <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
                  <div className="one-user-list-user-data">
                     <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
                  <div className="one-user-list-user-data">
                     <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
                  <div className="one-user-list-user-data">
                     <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
                  <div className="one-user-list-user-data">
                     <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
                  <div className="one-user-list-user-data">
                     <div className="wrapper-one-user"><img src="../images/people.svg" alt="close"/><p> Маша</p></div>
                     <p>test@gmail.com</p>
                  </div>
               </div>
    )
});
export default ListForPoints;