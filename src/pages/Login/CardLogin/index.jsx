import React from "react";
import "./styles.scoped.scss";

function CardLogin() {
    return (
        <div className="container">
            <label>Usuário</label>
            <input type="text" />

            <label>Senha</label>
            <input type="password" />
        </div>
    );
}

export default CardLogin;
