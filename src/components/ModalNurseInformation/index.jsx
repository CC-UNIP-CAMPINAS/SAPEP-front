import React from "react";
import { connect } from "react-redux";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { updateNurse } from "../../store/actions/nurse.action";
import Button from "../Button/Button/index";
import "./styles.scoped.scss";
import { phoneMask } from "../../helpers/masks";

function ModalNurseInformation({ nurse, updateNurse, closeModal }) {
    const [disabled, setDisabled] = React.useState(true);

    const initialState = {
        email: nurse.user.email,
        coren: nurse.coren,
        name: nurse.user.name,
        phone: nurse.user.phone,
        gender: nurse.user.gender,
    };

    const [inputs, setInputs] = React.useState({
        ...initialState,
    });

    function clear() {
        setInputs(initialState);
        setDisabled(true);
    }

    function handleEditInputs() {
        const element = document.getElementById("container-nurse");
        if (element) element.scrollTo({ top: 0, behavior: "smooth" });

        disabled ? setDisabled(false) : setDisabled(true);
    }

    async function handleActivationNurse() {
        try {
            if (nurse.active) {
                await api.patch("/user/nurse/disable/" + nurse.userId);
                notification(types.SUCCESS, "Cadastro desativado.");
                updateNurse({ ...nurse, active: false });
            } else {
                await api.patch("/user/nurse/enable/" + nurse.userId);
                notification(types.SUCCESS, "Cadastro ativado.");
                updateNurse({ ...nurse, active: true });
            }

            closeModal();
        } catch (error) {
            if (error.response.status === 404) {
                notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 500) {
                notification(types.ERROR, "Algum problema ocorreu, tente novamente.");
            }
        }
    }

    async function handleUpdateNurse() {
        try {
            if (await validate("update-nurse", inputs)) {
                const body = {
                    nurseParams: { coren: inputs.coren, userId: nurse.userId },
                    userParams: {
                        email: inputs.email,
                        name: inputs.name,
                        phone: inputs.phone,
                        gender: inputs.gender,
                    },
                };

                const { data } = await api.patch("/user/nurse", body);

                updateNurse(data.payload.nurse);
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
        <div className="container" id="container-nurse">
            <h1>Dados do enfermeiro</h1>
            <label>ID: </label>
            <input value={nurse.userId} disabled={true} />
            <label>Nome: </label>
            <input
                value={inputs.name}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <label>Email: </label>
            <input
                value={inputs.email}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <label>COREN: </label>
            <input
                value={inputs.coren}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, crm: e.target.value })}
            />

            <label>Gênero: </label>
            <select
                name="gender"
                disabled={disabled}
                value={inputs.gender}
                onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}
            >
                <option value="INDEFINIDO">Indefinido</option>
                <option value="F">Feminino</option>
                <option value="M">Masculino</option>
            </select>
            <label>Telefone: </label>
            <input
                value={inputs.phone}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, phone: phoneMask(e.target.value) })}
            />

            <div>
                {disabled ? (
                    <Button text="Liberar atualização" color="cyan" handle={handleEditInputs} />
                ) : (
                    <Button text="Atualizar" color="green" handle={handleUpdateNurse} isLoading={true} />
                )}
                <span />
                {!disabled ? (
                    <Button text="Cancelar" color="red" handle={clear} />
                ) : nurse.active ? (
                    <Button text="Desativar" color="red" handle={handleActivationNurse} isLoading={true} />
                ) : (
                    <Button text="Restaurar" color="green" handle={handleActivationNurse} isLoading={true} />
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        nurses: states.nurses,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateNurse(nurse) {
            const action = updateNurse(nurse);
            dispatch(action);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalNurseInformation);
