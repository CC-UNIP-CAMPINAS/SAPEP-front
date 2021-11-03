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

function ModalAdmInformation({ adm, updateAdm, closeModal }) {
    const [disabled, setDisabled] = React.useState(true);

    const initialState = {
        email: adm.user.email,
        name: adm.user.name,
        phone: adm.user.phone,
        gender: adm.user.gender,
    };

    const [inputs, setInputs] = React.useState({
        ...initialState,
    });

    function clear() {
        setInputs(initialState);
        setDisabled(true);
    }

    function handleEditInputs() {
        const element = document.getElementById("container-adm");
        if (element) element.scrollTo({ top: 0, behavior: "smooth" });

        disabled ? setDisabled(false) : setDisabled(true);
    }

    async function handleActivationAdm() {
        try {
            if (adm.user.active) {
                await api.patch("/user/adm/disable/" + adm.userId);
                notification(types.SUCCESS, "Cadastro desativado.");
                updateAdm({ ...adm, user: { ...adm.user, active: false } });
            } else {
                await api.patch("/user/adm/enable/" + adm.userId);
                notification(types.SUCCESS, "Cadastro ativado.");
                updateAdm({ ...adm, user: { ...adm.user, active: true } });
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

    async function handleUpdateAdm() {
        try {
            if (await validate("update-adm", inputs)) {
                const body = {
                    admParams: { userId: adm.userId },
                    userParams: {
                        email: inputs.email,
                        name: inputs.name,
                        phone: inputs.phone,
                        gender: inputs.gender,
                    },
                };

                const { data } = await api.patch("/user/adm", body);

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
        <div className="container" id="container-adm">
            <h1>Dados do usuário administrativo</h1>
            <label>ID: </label>
            <input value={adm.userId} disabled={true} />
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
                    <Button text="Atualizar" color="green" handle={handleUpdateAdm} isLoading={true} />
                )}
                <span />
                {!disabled ? (
                    <Button text="Cancelar" color="red" handle={clear} />
                ) : adm.user.active ? (
                    <Button text="Desativar" color="red" handle={handleActivationAdm} isLoading={true} />
                ) : (
                    <Button text="Restaurar" color="green" handle={handleActivationAdm} isLoading={true} />
                )}
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
)(ModalAdmInformation);
