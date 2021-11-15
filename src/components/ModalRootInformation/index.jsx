import React from "react";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import Button from "../Button/Button/index";
import "./styles.scoped.scss";

function ModalRootInformation({ root }) {
    const initialState = {
        email: root.email,
        name: root.name,
    };

    const [inputs, setInputs] = React.useState({
        ...initialState,
    });

    async function handleUpdateEmail() {
        try {
            const { data } = await api.post(`${process.env.REACT_APP_API_HOST}/reset-email`, {
                newEmail: inputs.email,
            });
            notification(types.SUCCESS, data.message);
        } catch (error) {
            if (error.response.status === 401) {
                return notification(types.NOT_AUTHORIZED, error.response.data.message);
            }
            if (error.response.status === 409) {
                return notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 404) {
                return notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 400) {
                return notification(types.WARNING, error.response.data.message);
            }
            notification(types.ERROR, "Algum problema ocorreu, tente novamente.");
        }
    }

    async function handleUpdatePassword() {
        try {
            const { data } = await api.post(`${process.env.REACT_APP_API_HOST}/reset-password`, {
                email: root.email,
            });
            notification(types.SUCCESS, data.message);
        } catch (error) {
            if (error.response.status === 401) {
                return notification(types.NOT_AUTHORIZED, error.response.data.message);
            }
            if (error.response.status === 409) {
                return notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 404) {
                return notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 400) {
                return notification(types.WARNING, error.response.data.message);
            }
            notification(types.ERROR, "Algum problema ocorreu, tente novamente.");
        }
    }

    return (
        <div className="container" id="container-root">
            <h1>Dados do usuário root</h1>
            <label>ID: </label>
            <input value={root.id} disabled={true} />
            <label>Nome: </label>
            <input value={inputs.name} disabled={true} />

            <div id="password-field">
                <h3>Segurança da conta</h3>

                <label>Email: </label>
                <input value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
                <span />
                <Button text="Atualizar email" color="black" handle={handleUpdateEmail} isLoading={true} />
                <span />
                <hr />
                <span />
                <label>Senha: </label>
                <Button
                    text="Enviar email de troca de senha"
                    color="black"
                    handle={handleUpdatePassword}
                    isLoading={true}
                />
            </div>
        </div>
    );
}

export default ModalRootInformation;
