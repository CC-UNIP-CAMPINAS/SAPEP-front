import React from "react";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardLogin({ inputs, setInputs, handleLogin }) {
    async function execOnKeyPress(event) {
        if (event.key === "Enter") {
            document.getElementById("button-login")?.click();
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
            </div>

            <Button id="button-login" handle={handleLogin} text="Entrar" isLoading={true} color="cyan" disable />
        </div>
    );
}

export default CardLogin;
