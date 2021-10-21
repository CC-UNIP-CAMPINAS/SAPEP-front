import React from "react";
import { connect } from "react-redux";
import { phoneMask } from "../../helpers/masks";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { addAdm } from "../../store/actions/adm.action";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardAddAdm({ addAdm, close }) {
    const [inputs, setInputs] = React.useState({
        email: "",
        password: "",
        name: "",
        phone: "",
        gender: "INDEFINIDO",
    });

    async function handleAddAdm() {
        try {
            const body = { ...inputs };
            if (await validate("create-adm", body)) {
                const { data } = await api.post("/user/adm", { ...inputs });
                addAdm(data);
                close();
                notification(types.SUCCESS, "Registro criado.");
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
                <h1>Criar usuário administrativo</h1>
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
                    <Button text="Criar" color="green" handle={handleAddAdm} isLoading={true} />
                </span>
            </div>
        </section>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addAdm(adm) {
            const action = addAdm(adm);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CardAddAdm);
