import "./styles.scoped.scss";
import CardLogin from "../../components/CardLogin/index";
import { useState } from "react";
import { api } from "../../services/api";
import yup from "../../services/yup";
import { notification } from "../../services/toastify";
import types from "../../services/types";

function Login() {
    const [inputs, setInputs] = useState({
        password: "",
        user: "",
    });

    async function handleLogin() {
        try {
            const body = { email: inputs.user, password: inputs.password };
            if (await yup("login", body)) {
                const { data } = await api.post("/login", body);
                notification(types.SUCCESS, data.message);
            }
        } catch (error) {
            if (error.response.status === 404) {
                notification(types.INFO, error.response.data.message);
            }
            if (error.response.status === 401) {
                notification(types.NOT_AUTHORIZED, error.response.data.message);
            }
            if (error.response.status === 500) {
                notification(types.ERROR, "Algum problema ocorreu, tente novamente.");
            }
        }
    }

    return (
        <div className="container">
            <div />
            <CardLogin inputs={inputs} setInputs={setInputs} handleLogin={handleLogin} />
        </div>
    );
}

export default Login;
