import React from "react";
import { connect } from "react-redux";
import { phoneMask } from "../../helpers/masks";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { updateAdm } from "../../store/actions/adm.action";
import Button from "../Button/Button/index";
import "./styles.scoped.scss";

function ModalRootInformation({ root, closeModal }) {
    const [disabled, setDisabled] = React.useState(true);

    const initialState = {
        email: root.email,
        name: root.name,
    };

    const initialStatePassword = {
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
    };

    const [inputs, setInputs] = React.useState({
        ...initialState,
    });

    const [inputsPassword, setInputsPassword] = React.useState({
        ...initialStatePassword,
    });

    function clear() {
        setInputs(initialState);
        setInputsPassword(initialStatePassword);
        setDisabled(true);
    }

    function handleEditInputs() {
        const element = document.getElementById("container-root");
        if (element) element.scrollTo({ top: 0, behavior: "smooth" });

        disabled ? setDisabled(false) : setDisabled(true);
    }

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

    async function handleUpdateRoot() {
        try {
            if (await validate("update-root", inputs)) {
                const body = {
                    rootParams: { userId: root.userId },
                    userParams: {
                        email: inputs.email,
                        name: inputs.name,
                    },
                };

                const { data } = await api.patch("/user/root", body);

                updateAdm(data.payload.adm);
                notification(types.SUCCESS, "Cadastro atualizado.");
                closeModal();
            }
        } catch (error) {
            if (error.response.status === 401) {
                notification(types.NOT_AUTHORIZED, error.response.data.message);
            }
            if (error.response.status === 409) {
                notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 404) {
                notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 500) {
                notification(types.ERROR, "Algum problema ocorreu, tente novamente.");
            }
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
                <label>Senha antiga: </label>
                <input
                    placeholder={"*************"}
                    type="password"
                    value={inputsPassword.oldPassword}
                    onChange={(e) => setInputsPassword({ ...inputsPassword, oldPassword: e.target.value })}
                />
                <label>Nova senha: </label>
                <input
                    placeholder={"*************"}
                    type="password"
                    value={inputsPassword.newPassword}
                    onChange={(e) => setInputsPassword({ ...inputsPassword, newPassword: e.target.value })}
                />
                <label>Confirmar senha: </label>
                <input
                    placeholder={"*************"}
                    type="password"
                    value={inputsPassword.confirmPassword}
                    onChange={(e) => setInputsPassword({ ...inputsPassword, confirmPassword: e.target.value })}
                />
                <span />
                <Button text="Atualizar senha" color="black" handle={handleEditInputs} />
            </div>
        </div>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateAdm(adm) {
            const action = updateAdm(adm);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(ModalRootInformation);
