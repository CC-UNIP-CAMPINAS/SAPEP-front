import axios from "axios";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
import { connect } from "react-redux";
import { cepMask, cpfMask, phoneMask, rgMask } from "../../helpers/masks";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { updatePatient } from "../../store/actions/patients.action";
import Button from "../Button/Button/index";
import "./styles.scoped.scss";

function ModalPatientInformation({ patient, updatePatient, closeModal }) {
    const [disabled, setDisabled] = React.useState(true);
    dayjs.extend(utc);

    const initialState = {
        name: patient.name, //ok
        lastName: patient.lastName, //ok
        phone: patient.phone, //ok
        gender: patient.gender, //ok
        cep: patient.cep, //ok
        addressNumber: patient.addressNumber, //ok
        complement: patient.complement, //ok
        birthday: patient.birthday ? dayjs.utc(patient.birthday).format("YYYY-MM-DD") : null, //ok
        cpf: patient.cpf, //ok
        rg: patient.rg, //ok
        healthInsurance: patient.healthInsurance, //ok
    };

    const [inputs, setInputs] = React.useState({
        ...initialState,
    });

    const [address, setAddress] = React.useState("");
    const [cepPermission, setCepPermission] = React.useState(true);

    React.useEffect(() => {
        async function handleSearchCep() {
            try {
                if (inputs.cep.length === 9) {
                    const address = inputs.cep.replace(/\D/g, "");
                    const { data } = await axios.get(`https://viacep.com.br/ws/${address}/json/`);

                    if (data.erro) {
                        setAddress("Problema para achar o endereço pelo CEP 😢");
                        notification(types.INFO, "Digite um CEP válido.");
                        setCepPermission(true);
                    } else {
                        setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
                        setCepPermission(false);
                    }
                }
                if (inputs.cep.length === 0) {
                    setAddress(``);
                    setCepPermission(false);
                }
            } catch (error) {
                setAddress("Problema para achar o endereço pelo CEP 😢");
                notification(types.INFO, "Digite um CEP válido.");
                setCepPermission(true);
            }
        }

        handleSearchCep();
    }, [inputs.cep]);

    function clear() {
        setInputs(initialState);
        setDisabled(true);
    }

    function handleEditInputs() {
        const element = document.getElementById("container-patient");
        if (element) element.scrollTo({ top: 0, behavior: "smooth" });

        disabled ? setDisabled(false) : setDisabled(true);
    }

    async function handleUpdatePatient() {
        try {
            const body = {
                ...inputs,
                id: patient.id,
                birthday: inputs.birthday
                    ? dayjs(inputs.birthday)
                          .utc(true)
                          .toISOString()
                    : "",
            };
            if (await validate("update-patient", inputs)) {
                if (!cepPermission) {
                    const { data } = await api.patch("/patient", body);

                    updatePatient(data);
                    notification(types.SUCCESS, "Cadastro atualizado.");
                    closeModal();
                } else {
                    notification(types.INFO, "Digite um CEP válido.");
                }
            }
        } catch (error) {
            console.log(error);
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
        <div className="container" id="container-patient">
            <h1>Dados do paciente</h1>
            <label>ID: </label>
            <input value={patient.id} disabled={true} />
            <label>Nome: </label>
            <input
                value={inputs.name}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            />
            <label>SobreNome: </label>
            <input
                value={inputs.lastName}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
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
            <label>CEP: </label>
            <input
                value={inputs.cep}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, cep: cepMask(e.target.value) })}
            />
            <label>Endereço: </label>
            <input value={address} disabled={true} />
            <label>Número: </label>
            <input
                value={inputs.addressNumber}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, addressNumber: e.target.value })}
            />
            <label>Complemento: </label>
            <input
                value={inputs.complement}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, complement: e.target.value })}
            />
            <label>Data de Nascimento: </label>
            <input
                type="date"
                value={inputs.birthday}
                disabled={disabled}
                onChange={(e) => {
                    setInputs({ ...inputs, birthday: e.target.value });
                }}
            />
            <label>CPF: </label>
            <input
                value={inputs.cpf}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, cpf: cpfMask(e.target.value) })}
            />
            <label>RG: </label>
            <input
                value={inputs.rg}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, rg: rgMask(e.target.value) })}
            />
            <label>Convênio: </label>
            <input
                value={inputs.healthInsurance}
                disabled={disabled}
                onChange={(e) => setInputs({ ...inputs, healthInsurance: e.target.value })}
            />

            <div>
                {disabled ? (
                    <Button text="Liberar atualização" color="cyan" handle={handleEditInputs} />
                ) : (
                    <Button
                        text="Atualizar"
                        color="green"
                        handle={handleUpdatePatient}
                        isLoading={true}
                        disabled={cepPermission}
                    />
                )}

                <span />
                {!disabled ? <Button text="Cancelar" color="red" handle={clear} /> : ""}
            </div>
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        patients: states.patients,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updatePatient(patient) {
            const action = updatePatient(patient);
            dispatch(action);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ModalPatientInformation);
