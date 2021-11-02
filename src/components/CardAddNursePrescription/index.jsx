import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { addNursePrescription } from "../../store/actions/patients.action";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardAddNursePrescription({ addNursePrescription, close, medicalRecordId }) {
    const { id } = useParams();

    const [inputs, setInputs] = React.useState({
        prescription: "",
        obs: "",
    });

    async function handleAddNursePrescription() {
        try {
            const body = { ...inputs, medicalRecordId };
            if (await validate("create-nurse-prescription", body)) {
                const { data } = await api.post("/nurse-prescription", body);
                addNursePrescription({ data, patientId: id });
                close();
                notification(types.SUCCESS, "Prescrição criada.");
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
                <h1>Criar Prescrição de Enfermagem</h1>
                <span>Campos obrigatórios: *</span>
            </header>
            <section id="inputs">
                <label>
                    Prescrição: <span>*</span>
                </label>
                <input
                    value={inputs.drug}
                    type="text"
                    placeholder="Ibuprofeno"
                    onChange={(e) => setInputs({ ...inputs, prescription: e.target.value })}
                />
                <label>Observação: </label>
                <textarea
                    value={inputs.obs}
                    type=""
                    placeholder="Diluir com SF 0.9%"
                    onChange={(e) => setInputs({ ...inputs, obs: e.target.value })}
                />
            </section>

            <div id="button">
                <span>
                    <Button text="Criar" color="green" handle={handleAddNursePrescription} isLoading={true} />
                </span>
            </div>
        </section>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNursePrescription(nursePrescription) {
            const action = addNursePrescription(nursePrescription);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CardAddNursePrescription);
