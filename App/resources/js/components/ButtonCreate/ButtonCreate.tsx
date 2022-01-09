import React from "react";
import "./_ButtonCreate.scss";

const ButtonCreate: React.FC = (props: any) => {
    return (
        <div
            className="button-main"
            onClick={() => {
                const idPage = props.callbackClick();
                if (idPage != undefined) {
                    idPage.then((data: any) => props.redirectPage(data));
                }
                if (props.closeClick != undefined) {
                    props.closeClick();
                }
            }}
        >
            {props.image ? <img src={props.srcImage}></img> : ""}
            <input
                className="button-add-new-item "
                type={props.type}
                value={props.name}
            />
        </div>
    );
};

export default ButtonCreate;
