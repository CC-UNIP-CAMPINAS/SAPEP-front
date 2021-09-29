import React from "react";
import "./styles.scoped.scss";

function CardLogin() {
    return (
        <div className="container">
            <img src="/logo.svg" alt="logo" />
            <div>
                <label>Usuário</label>
                <input type="text" placeholder="Usuário" />

                <label>Senha</label>
                <input type="password" placeholder="Senha" />
            </div>

            <button type="button">Entrar</button>
        </div>
    );
}

export default CardLogin;
