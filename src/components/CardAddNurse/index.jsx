import React from "react";
import { connect } from "react-redux";
import { phoneMask } from "../../helpers/masks";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { addNurse } from "../../store/actions/nurse.action";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardAddNurse({ addNurse, close }) {
    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
        coren: "",
        name: "",
        phone: "",
        gender: "INDEFINIDO",
    });

    async function handleAddNurse() {
        try {
            const body = { ...inputs };
            if (await validate("create-nurse", body)) {
                const { data } = await api.post("/user/nurse", { ...inputs });
                addNurse(data);
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
                <h1>Criar enfermeiro</h1>
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
                    COREN: <span>*</span>
                </label>
                <input
                    value={inputs.coren}
                    type="text"
                    placeholder="XXXXX - XX"
                    onChange={(e) => setInputs({ ...inputs, coren: e.target.value })}
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
            </section>

            <div id="button">
                <span>
                    <Button text="Criar" color="green" handle={handleAddNurse} isLoading={true} />
                </span>
            </div>
        </section>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNurse(nurse) {
            const action = addNurse(nurse);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CardAddNurse);
