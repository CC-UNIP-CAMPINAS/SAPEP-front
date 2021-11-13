import React from "react";
import { api } from "../../services/api";
import Button from "../Button/Button";
import "./styles.scoped.scss";
import types from "../../services/types";
import { notification } from "../../services/toastify";

function CardLogin({ inputs, setInputs, handleLogin }) {
    async function execOnKeyPress(event) {
        if (event.key === "Enter") {
            document.getElementById("button-login")?.click();
        }
    }

    async function handleResetPassword() {
        try {
            if (inputs.user !== "") {
                const { data } = await api.post(`${process.env.REACT_APP_API_HOST}/reset-password`, {
                    email: inputs.user,
                });
                notification(types.SUCCESS, data.message);
            } else {
                notification(types.INFO, "Digite um email válido.");
            }
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
        <div className="container">
            <span>
                <img src="/logo.svg" alt="logo" />
            </span>

            <div>
                <label>Email</label>
                <input
                    value={inputs.user}
                    onChange={(e) => setInputs({ ...inputs, user: e.target.value })}
                    type="text"
                    placeholder="amanda@gmail.com"
                    onKeyPress={(event) => {
                        execOnKeyPress(event);
                    }}
                />
                <label>Senha</label>
                <input
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    type="password"
                    placeholder="Senha"
                    onKeyPress={(event) => {
                        execOnKeyPress(event);
                    }}
                />
                <p>
                    Esqueceu sua senha?{" "}
                    <button className="link" onClick={handleResetPassword}>
                        Clique aqui!
                    </button>
                </p>
            </div>

            <Button id="button-login" handle={handleLogin} text="Entrar" isLoading={true} color="cyan" disable />
        </div>
    );
}

export default CardLogin;
