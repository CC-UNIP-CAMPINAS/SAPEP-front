import React from "react";

import "./styles.scoped.scss";

function CardTableRowInformation({ information }) {
    return (
        <div>
            <p>{information.id}</p>
            <p>{information.name}</p>
            <p>{information.crm}</p>
            <p>{information.gender}</p>
            <p>{information.phone}</p>
        </div>
    );
}

export default CardTableRowInformation;
