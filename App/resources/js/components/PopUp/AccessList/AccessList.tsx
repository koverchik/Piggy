import React from "react";
import { observer } from "mobx-react-lite";
import './_AccessList.scss';

const AccessList: React.FC = observer(() => {    
    
    

    return (    
            <div className="access-new-user">
                <div className="access-new-user-wrapper">
                    <p><input name="access" type="radio" value="owner" className="radio-checkbox" />Владелец</p>
                    <p><input name="access" type="radio" value="editor" className="radio-checkbox"/>Редактор</p>
                    <p><input name="access" type="radio" value="user" className="radio-checkbox"/>Пользователь</p>            
                </div>
            </div>
        )
});
export default AccessList;