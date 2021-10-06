import React from "react";

import "./styles.scoped.scss";
import Button from "../Button/Button/index";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { connect } from "react-redux";
import { updateDoctor } from "../../store/actions/doctor.action";

function ModalDoctorInformation({ doctor, updateDoctor, closeModal }) {
    const [disabled, setDisabled] = React.useState(true);

    const initialState = {
        email: doctor.user.email,
        crm: doctor.crm,
        name: doctor.user.name,
        phone: doctor.user.phone,
        area: doctor.area,
        gender: doctor.user.gender,
    };

    const [inputs, setInputs] = React.useState({
        ...initialState,
    });

    function clear() {
        setInputs(initialState);
        setDisabled(true);
    }

    function handleEditInputs() {
        const element = document.getElementById("container-doctor");
        if (element) element.scrollTo({ top: 0, behavior: "smooth" });

        disabled ? setDisabled(false) : setDisabled(true);
    }

    async function handleRemoveDoctor() {
        try {
            await api.delete("/user/doctor/" + doctor.userId);
            notification(types.SUCCESS, "Cadastro desativado.");
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

    async function handleUpdateDoctor() {
        try {
            if (await validate("update-doctor", inputs)) {
                const body = {
                    doctorParams: { crm: inputs.crm, area: inputs.area, userId: doctor.userId },
                    userParams: {
                        email: inputs.email,
                        name: inputs.name,
                        phone: inputs.phone,
                        gender: inputs.gender,
                    },
                };

                const { data } = await api.patch("/user/doctor", body);

                updateDoctor(data.payload.doctor);
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
        <div className="container" id="container-doctor">
            <h1>Dados do médico</h1>
            <label>ID: </label>
            <input value={doctor.userId} disabled={true} />
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
            <label>CRM: </label>
            <input
                value={inputs.crm}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, crm: e.target.value })}
            />
            <label>Área: </label>
            <input
                value={inputs.area}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
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
                onChange={(e) => setInputs({ ...inputs, phone: e.target.value })}
            />

            <div>
                {disabled ? (
                    <Button text="Liberar atualização" color="cyan" handle={handleEditInputs} />
                ) : (
                    <Button text="Atualizar" color="green" handle={handleUpdateDoctor} isLoading={true} />
                )}
                <span />
                {!disabled ? (
                    <Button text="Cancelar" color="red" handle={clear} />
                ) : (
                    <Button text="Excluir" color="red" handle={handleRemoveDoctor} isLoading={true} />
                )}
            </div>
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        doctors: states.doctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateDoctor(doctor) {
            const action = updateDoctor(doctor);
            dispatch(action);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalDoctorInformation);
