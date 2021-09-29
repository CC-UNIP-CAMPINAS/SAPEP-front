import React from "react";
import ButtonDefault from "../../../components/Button/ButtonDefault";
import "./styles.scoped.scss";
import InputDefault from "../../../components/Button/Input/InputDefault/index";

function CardLogin() {
    return (
        <div className="container">
            <label>Usuário</label>
            <InputDefault placeholder="Usuário" type="text" />

            <label>Senha</label>
            <InputDefault placeholder="Senha" type="password" />
            <ButtonDefault text="Entrar" color="cyan" />
        </div>
    );
}

export default CardLogin;
