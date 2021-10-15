import React from "react";
import Button from "../Button/Button";

import "./styles.scoped.scss";
import types from "../../services/types";
import { notification } from "../../services/toastify";
import { api } from "../../services/api";
import validate from "../../services/yup";
import { connect } from "react-redux";
import { addDoctor } from "../../store/actions/doctor.action";
import { phoneMask } from "../../helpers/masks";

function CardAddDoctor({ addDoctor, close }) {
    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
        crm: "",
        name: "",
        phone: "",
        area: "",
        gender: "INDEFINIDO",
    });

    async function handleAddDoctor() {
        try {
            const body = { ...inputs };
            if (await validate("create-doctor", body)) {
                const { data } = await api.post("/user/doctor", { ...inputs });
                console.log(data);
                addDoctor(data);
                close();
                notification(types.SUCCESS, "Médico criado com sucesso!");
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
                <h1>Criar médico</h1>
                <span>Campos obrigatórios: *</span>
            </header>

            <section id="inputs">
                <label>
                    Nome: <span>*</span>
                </label>
                <input
                    value={inputs.name}
                    type="text"
                    placeholder="Roberto de Paula Souza"
                    onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                />
                <label>
                    Email: <span>*</span>
                </label>
                <input
                    value={inputs.email}
                    type="text"
                    placeholder="robert@gmail.com"
                    onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                />
                <label>
                    Senha: <span>*</span>
                </label>
                <input
                    value={inputs.password}
                    type="password"
                    placeholder="***********"
                    onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                />
                <label>
                    CRM: <span>*</span>
                </label>
                <input
                    value={inputs.crm}
                    type="text"
                    placeholder="XXXXX - XX"
                    onChange={(e) => setInputs({ ...inputs, crm: e.target.value })}
                />
                <label>Telefone: </label>
                <input
                    value={inputs.phone}
                    type="text"
                    placeholder="(XX) XXXXX-XXXX"
                    onChange={(e) => setInputs({ ...inputs, phone: phoneMask(e.target.value) })}
                />
                <label>Gênero: </label>
                <select name="gender" onChange={(e) => setInputs({ ...inputs, gender: e.target.value })}>
                    <option value="INDEFINIDO">Indefinido</option>
                    <option value="F">Feminino</option>
                    <option value="M">Masculino</option>
                </select>
                <label>
                    Área: <span>*</span>
                </label>
                <input
                    value={inputs.area}
                    type="text"
                    placeholder="Pediatria"
                    onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
                />
            </section>

            <div id="button">
                <span>
                    <Button text="Criar" color="green" handle={handleAddDoctor} isLoading={true} />
                </span>
            </div>
        </section>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDoctor(doctor) {
            const action = addDoctor(doctor);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CardAddDoctor);
