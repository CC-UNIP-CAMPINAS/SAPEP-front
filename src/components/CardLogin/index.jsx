import React from "react";
import "./styles.scoped.scss";

function CardLogin() {
    return (
        <div className="container">
            <label>Usuário</label>
            <input type="text" placeholder="Usuário" />

            <label>Senha</label>
            <input type="password" placeholder="Senha" />
            <button type="button">Entrar</button>
        </div>
    );
}

export default CardLogin;
