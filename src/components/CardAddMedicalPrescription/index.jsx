import React from "react";
import { connect } from "react-redux";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { addMedicalPrescription } from "../../store/actions/patients.action";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardAddMedicalPrescription({ addMedicalPrescription, close, id }) {
    const [inputs, setInputs] = React.useState({
        drug: "",
        drugDosage: "",
        drugWay: "",
        administrationInterval: "",
        obs: "",
    });

    async function handleAddMedicalPrescription() {
        try {
            const body = { ...inputs, medicalRecordId: id };
            if (await validate("create-medical-prescription", body)) {
                const { data } = await api.post("/medical-prescription", { ...inputs });
                addMedicalPrescription(data);
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
                <h1>Criar Prescrição Médica</h1>
                <span>Campos obrigatórios: *</span>
            </header>

            <section id="inputs">
                <label>
                    Medicamento: <span>*</span>
                </label>
                <input
                    value={inputs.drug}
                    type="text"
                    placeholder="Ibuprofeno"
                    onChange={(e) => setInputs({ ...inputs, drug: e.target.value })}
                />
                <label>
                    Dosagem: <span>*</span>
                </label>
                <input
                    value={inputs.drugDosage}
                    type="text"
                    placeholder="500 mg"
                    onChange={(e) => setInputs({ ...inputs, drugDosage: e.target.value })}
                />
                <label>
                    Via de administração: <span>*</span>
                </label>
                <input
                    value={inputs.drugWay}
                    type="text"
                    placeholder="IV"
                    onChange={(e) => setInputs({ ...inputs, drugWay: e.target.value })}
                />
                <label>
                    Intervalo de administração: <span>*</span>
                </label>
                <input
                    value={inputs.administrationInterval}
                    type="text"
                    placeholder="6/6H"
                    onChange={(e) => setInputs({ ...inputs, administrationInterval: e.target.value })}
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
                    <Button text="Criar" color="green" handle={handleAddMedicalPrescription} isLoading={true} />
                </span>
            </div>
        </section>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addMedicalPrescription(medicalPrescription) {
            const action = addMedicalPrescription(medicalPrescription);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CardAddMedicalPrescription);
