import React from "react";
import ButtonDefault from "../../../components/Button/ButtonDefault";
import "./styles.scoped.scss";

function CardLogin() {
    return (
        <div className="container">
            <label>Usuário</label>
            <input type="text" />

            <label>Senha</label>
            <input type="password" />
            <ButtonDefault text="Entrar" color="cyan"></ButtonDefault>
        </div>
    );
}

export default CardLogin;
