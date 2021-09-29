import React from "react";
import "./styles.scoped.scss";

function CardLogin({ inputs, setInputs, handleLogin }) {
    return (
        <div className="container">
            <span>
                <img src="/logo.svg" alt="logo" />
            </span>

            <div>
                <label>Usuário</label>
                <input
                    value={inputs.user}
                    onChange={(e) => setInputs({ ...inputs, user: e.target.value })}
                    type="text"
                    placeholder="Usuário"
                />

                <label>Senha</label>
                <input
                    value={inputs.password}
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                    type="password"
                    placeholder="Senha"
                />
            </div>

            <button type="button" onClick={handleLogin}>
                Entrar
            </button>
        </div>
    );
}

export default CardLogin;
