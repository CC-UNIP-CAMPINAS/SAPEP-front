import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import validate from "../../services/yup";
import { addNurseReport } from "../../store/actions/patients.action";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardAddNurseReport({ addNurseReport, close, medicalRecordId }) {
    const { id } = useParams();

    const [inputs, setInputs] = React.useState({
        report: "",
    });

    async function handleAddNurseReport() {
        try {
            const body = { ...inputs, medicalRecordId };
            if (await validate("create-nurse-report", body)) {
                const { data } = await api.post("/nurse-report", body);
                addNurseReport({ data, patientId: id });
                close();
                notification(types.SUCCESS, "Relatório criado.");
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
                <h1>Criar Relatório de Enfermagem</h1>
                <span>Campos obrigatórios: *</span>
            </header>

            <section id="inputs">
                <label>
                    Relatório: <span>*</span>
                </label>
                <textarea
                    value={inputs.report}
                    type=""
                    placeholder="Detalhamento de procedimentos realizados no paciente;"
                    onChange={(e) => setInputs({ ...inputs, report: e.target.value })}
                />
            </section>

            <div id="button">
                <span>
                    <Button text="Criar" color="green" handle={handleAddNurseReport} isLoading={true} />
                </span>
            </div>
        </section>
    );
}

const mapDispatchToProps = (dispatch) => {
    return {
        addNurseReport(report) {
            const action = addNurseReport(report);
            dispatch(action);
        },
    };
};

export default connect(
    null,
    mapDispatchToProps
)(CardAddNurseReport);
