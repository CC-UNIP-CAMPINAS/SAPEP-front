import axios from "axios";
import React from "react";
import { connect } from "react-redux";
import { cepMask, cpfMask, phoneMask, rgMask } from "../../helpers/masks";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { addPatient } from "../../store/actions/patients.action";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardAddPatient({ addPatient, close }) {
    const [inputs, setInputs] = React.useState({
        name: "", //ok
        lastName: "", //ok
        cep: "", //ok
        addressNumber: "", //ok
        complement: "", //ok
        phone: "", //ok
        birthday: "", //ok
        cpf: "", //ok
        rg: "", //ok
        healthInsurance: "", //ok
        gender: "INDEFINIDO", //ok
    });

    const [address, setAddress] = React.useState("");

    React.useEffect(() => {
        async function handleSearchCep() {
            try {
                if (inputs.cep.length === 9) {
                    const address = inputs.cep.replace(/\D/g, "");
                    const { data } = await axios.get(`https://viacep.com.br/ws/${address}/json/`);

                    if (data.erro) {
                        setAddress("Problema para achar o endereço pelo CEP 😢");
                    } else {
                        setAddress(`${data.logradouro}, ${data.bairro}, ${data.localidade} - ${data.uf}`);
                    }
                }
            } catch (error) {
                setAddress("Problema para achar o endereço pelo CEP 😢");
            }
        }

        handleSearchCep();
    }, [inputs.cep]);

    async function handleAddPatient() {
        try {
            const body = { ...inputs };
            if (await validate("create-patient", body)) {
                const { data } = await api.post("/patient", { ...inputs });
                addPatient(data);
                close();
                notification(types.SUCCESS, data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response.status === 401) {
                notification(types.NOT_AUTHORIZED, error.response.data.message);
            }
            if (error.response.status === 409) {
                notification(types.WARNING, error.response.data.message);
            }
            if (error.response.status === 500) {
                notification(types.ERROR, "Algum problema ocorreu, tente novamente.");
            }
        }
    }

    return (
        <section className="container">
            <header>
                <h1>Criar Paciente</h1>
                <span>Campos obrigatórios: *</span>
            </header>

            <section id="inputs">
                <label>
                    Nome: <span>*</span>
                </label>
                <input
                    value={inputs.name}
                    type="text"
                    placeholder="Roberto"
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
                <label>
                    Sobrenome: <span>*</span>
                </label>
                <input
                    value={inputs.lastName}
                    type="text"
                    placeholder="de Paula Souza"
                    onChange={(e) => setInputs({ ...inputs, lastName: e.target.value })}
                />
                <label>
                    RG: <span>*</span>
                </label>
                <input
                    value={inputs.rg}
                    type="text"
                    placeholder="XX.XXX.XXX-X"
                    onChange={(e) => setInputs({ ...inputs, rg: rgMask(e.target.value) })}
                />
                <label>
                    CPF: <span>*</span>
                </label>
                <input
                    value={inputs.cpf}
                    type="text"
                    placeholder="XXX.XXX.XXX-XX"
                    onChange={(e) => setInputs({ ...inputs, cpf: cpfMask(e.target.value) })}
                />
                <label>Telefone: </label>
                <input
                    value={inputs.phone}
                    type="text"
                    placeholder="(XX) XXXXX-XXXX"
                    onChange={(e) => setInputs({ ...inputs, phone: phoneMask(e.target.value) })}
                />
                <label>
                    Data de Nascimento: <span>*</span>
                </label>
                <input
                    value={inputs.birthday}
                    type="date"
                    onChange={(e) => setInputs({ ...inputs, birthday: e.target.value })}
                />
                <label>CEP: </label>
                <input
                    value={inputs.cep}
                    type="text"
                    placeholder="XXXXX-XXX"
                    onChange={(e) => setInputs({ ...inputs, cep: cepMask(e.target.value) })}
                />
                <label>Endereço: </label>
                <input value={address} disabled={true} />
                <label>Número: </label>
                <input
                    value={inputs.addressNumber}
                    type="text"
                    placeholder="XXX"
                    onChange={(e) => setInputs({ ...inputs, addressNumber: e.target.value })}
                />
                <label>Complemento: </label>
                <input
                    value={inputs.complement}
                    type="text"
                    placeholder="Bloco 3A Ap 201"
                    onChange={(e) => setInputs({ ...inputs, complement: e.target.value })}
                />
                <label>Convênio: </label>
                <input
                    value={inputs.healthInsurance}
                    type="text"
                    placeholder="SUS"
                    onChange={(e) => setInputs({ ...inputs, healthInsurance: e.target.value })}
                />
                <label>Gênero: </label>
                <select name="gender" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>
                    <option value="INDEFINIDO">Indefinido</option>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                </select>
            </section>

            <div id="button">
                <span>
                    <Button text="Criar" color="green" handle={handleAddPatient} isLoading={true} />
                </span>
            </div>
        </section>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addPatient(patient) {
            const action = addPatient(patient);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CardAddPatient);
