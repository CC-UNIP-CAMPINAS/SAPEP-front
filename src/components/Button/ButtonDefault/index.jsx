import React from "react";

import "./styles.scoped.scss";

function ButtonDefault({ onClick = () => {}, color, text }) {
    return (
        <button className={color} type="button" onClick={onClick}>
            {text}
        </button>
    );
}

export default ButtonDefault;
