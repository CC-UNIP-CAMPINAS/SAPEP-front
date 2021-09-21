import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import logo from "../../assets/img/logo.png";
import { button } from "../../components/Button/Button";
import { checkbox } from "../../components/Checkbox/Checkbox";
import { Input } from "../../components/Input/Input";
import api from "../../services/api";
import { setUser } from "../../store/actions/user.action";
import { createNotification } from "../../utils/NotificationUtils";
import types from "../../utils/types";

const Login = (props) => {
    const [redirect, setRedirect] = React.useState("");
    const [inputs, setInputs] = React.useState({ email: "", password: "" });

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const { data } = await api.post(
                "/login",
                { email: inputs.email, password: inputs.password },
                { withCredentials: true }
            );

            const user = { email: data.payload.user.email, auth: data.payload.auth };
            props.setUser(user);
            createNotification(types.SUCCESS, data.message);
            setRedirect(<Redirect to="/" />);
        } catch (error) {
            switch (error.response.status) {
                case 404:
                    createNotification(types.WARNING, error.response.data.message);
                    break;
                case 401:
                    createNotification(types.WARNING, error.response.data.message);
                    break;
                default:
                    createNotification(types.ERROR, error.message);
                    break;
            }
        }
    }

    return (
        <section>
            {redirect}
            <div className="container-login">
                <div className="row justify-content-center">
                    <div className="col-xl-6 col-lg-12 col-md-9">
                        <img src={logo} alt="logo" className="loginLogo" />
                        <div className="card shadow-sm my-5">
                            <div className="card-body p-0">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="login-form">
                                            <div className="text-center">
                                                <h1 className="h4 text-gray-900 mb-4">Login</h1>
                                            </div>
                                            <form className="user" onSubmit={(e) => handleLogin(e)}>
                                                <Input
                                                    type="email"
                                                    id="emailLogin"
                                                    placeholder="seuemail@gmail.com"
                                                    value={inputs.email}
                                                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                                                ></Input>
                                                <Input
                                                    type="password"
                                                    id="passwordLogin"
                                                    placeholder="*******"
                                                    value={inputs.password}
                                                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                                                ></Input>
                                                {checkbox("checkboxLogin", "teste")}
                                                {button("login", "Entrar", "index.html")}
                                            </form>
                                            <hr />
                                            <div className="text-center">
                                                <a className="font-weight-bold small" href="register.html">
                                                    Create an Account!
                                                </a>
                                            </div>
                                            <div className="text-center"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        setUser(user) {
            const action = setUser(user);
            dispatch(action);
        },
    };
};

export default connect(null, mapDispatchToProps)(Login);
