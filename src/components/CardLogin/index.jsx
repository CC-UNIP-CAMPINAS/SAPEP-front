import React from "react";
import "./styles.scoped.scss";

function CardLogin() {
    return (
        <div className="container">
            <span>
                <img src="/logo.svg" alt="logo" />
            </span>

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
