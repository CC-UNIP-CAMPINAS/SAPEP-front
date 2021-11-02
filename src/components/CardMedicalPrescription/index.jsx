import { Icon } from "@iconify/react";
import React from "react";

import "./styles.scoped.scss";
import dayjs from "dayjs";
import Button from "../Button/Button";
import { connect } from "react-redux";
import { api } from "../../services/api";
import { useParams } from "react-router";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import { setRealizedMedicalPrescription } from "../../store/actions/patients.action";

function CardMedicalPrescription({ prescription, user, setRealized }) {
    const { id } = useParams();

    async function handleExecutePrescription() {
        try {
            const { data } = await api.patch("/medical-prescription/set-realized", { id: prescription.id });
            setRealized({ data, patientId: id });
            notification(types.SUCCESS, "Prescrição executada.");
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
        <div className="container">
            <header>
                <p>Prescrição Médica</p>
                {prescription.realized ? (
                    <span>
                        <Icon icon="akar-icons:circle-check-fill" inline={true} color="#41e64e" />
                        {` Administrado ${prescription.Executors.length}/${prescription.administrationCount}`}
                    </span>
                ) : (
                    <span>
                        <Icon icon="ant-design:clock-circle-filled" inline={true} color="#157992" />
                        {` Aguardando administração ${prescription.Executors.length}/${
                            prescription.administrationCount
                        }`}
                    </span>
                )}
            </header>
            <section>
                <div id="content">
                    <main>
                        <p>
                            <span>Prescritor: </span>
                            {prescription.Prescriber.user.name}
                        </p>
                        <p>
                            <span>Data da prescrição: </span>
                            {dayjs(prescription.date).format("DD/MM/YYYY [às] HH:mm:ss")}
                        </p>
                    </main>

                    <div>
                        <p>
                            <span>Medicamento: </span>
                            {prescription.drug}
                        </p>
                        <p>
                            <span>Dosagem: </span>
                            {prescription.drugDosage}
                        </p>
                        <p>
                            <span>Via de administração: </span>
                            {prescription.drugWay}
                        </p>
                        <p>
                            <span>Intervalo de administração: </span>
                            {prescription.administrationInterval}
                        </p>
                        <p>
                            <span>Observação: </span>
                            {prescription.obs}
                        </p>
                    </div>
                </div>

                <div id="administration">
                    <main>
                        <p>
                            <span>Administrações:</span>
                        </p>

                        {prescription.Executors.length ? (
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Executor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {prescription.Executors.map((executor, index) => (
                                            <tr key={index}>
                                                <td>
                                                    {dayjs(executor.executionDate).format("DD/MM/YYYY [às] HH:mm:ss")}
                                                </td>
                                                <td>{executor.Executor.user.name}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <p>Nenhuma administração.</p>
                        )}
                    </main>
                    {prescription.realized ? (
                        ""
                    ) : user.groupId === 2 ? (
                        <span>
                            <Button text="Executar" color="cyan" handle={handleExecutePrescription} />
                        </span>
                    ) : (
                        ""
                    )}
                </div>
            </section>
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        user: states.user,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setRealized(prescription) {
            const action = setRealizedMedicalPrescription(prescription);
            dispatch(action);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardMedicalPrescription);
