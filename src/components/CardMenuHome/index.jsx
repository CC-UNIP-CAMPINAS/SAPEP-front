import React from "react";

import "./styles.scoped.scss";
import { Icon } from "@iconify/react";
import Button from "../Button/Button";

function CardMenuHome({ title, icon, quant, active }) {
    return (
        <div className={`container ${active}`}>
            <h1>
                <Icon icon={icon} inline={true} /> {title}
            </h1>
            <h2>{quant} Ativos</h2>
            <Button text="Gerenciar" color="cyan" />
        </div>
    );
}

export default CardMenuHome;
