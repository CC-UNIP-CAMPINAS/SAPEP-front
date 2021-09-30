import "./styles.scoped.scss";
import CardLogin from "../../components/CardLogin/index";
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import yup from "../../services/yup";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import { connect } from "react-redux";
import { setUser } from "../../store/actions/user.action";
import { Redirect } from "react-router-dom";

function Login({ setUser }) {
    const [inputs, setInputs] = useState({
        password: "",
        user: "",
    });

    const [redirect, setRedirect] = useState("");

    useEffect(() => {
        const loginJwt = async () => {
            try {
                const { data } = await api.post("/login-jwt");
                setUser({ ...data.payload.user, auth: true });
                notification(types.SUCCESS, data.message);
                setRedirect(<Redirect to="/" />);
            } catch (error) {
                console.log(error);
            }
        };
        loginJwt();
    }, [setUser]);

    async function handleLogin() {
        try {
            const body = { email: inputs.user, password: inputs.password };
            if (await yup("login", body)) {
                const { data } = await api.post("/login", body);
                console.log(data);
                setUser({ ...data.payload.user, auth: true });
                notification(types.SUCCESS, data.message);
                setRedirect(<Redirect to="/" />);
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
            {redirect}
            <div />
            <CardLogin inputs={inputs} setInputs={setInputs} handleLogin={handleLogin} />
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        setUser(user) {
            const action = setUser(user);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(Login);
