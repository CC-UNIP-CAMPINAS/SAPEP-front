import { Icon } from "@iconify/react";
import dayjs from "dayjs";
import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import { api } from "../../services/api";
import { notification } from "../../services/toastify";
import types from "../../services/types";
import { setRealizedNursePrescription } from "../../store/actions/patients.action";
import Button from "../Button/Button";
import "./styles.scoped.scss";

function CardNursePrescription({ prescription, user, setRealized }) {
    const { id } = useParams();

    async function handleExecutePrescription() {
        try {
            const { data } = await api.patch("/nurse-prescription/set-realized", { id: prescription.id });
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
                <p>Prescrição de Enfermagem</p>
                {prescription.realized ? (
                    <span>
                        <Icon icon="akar-icons:circle-check-fill" inline={true} color="#41e64e" />
                        {` Administrado`}
                    </span>
                ) : (
                    <span>
                        <Icon icon="ant-design:clock-circle-filled" inline={true} color="#157992" />
                        {` Aguardando administração`}
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
                            {dayjs(prescription.prescriptionDate).format("DD/MM/YYYY [às] HH:mm:ss")}
                        </p>
                    </main>

                    <div>
                        <p>
                            <span>Prescrição: </span>
                            {prescription.prescription}
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
                            <span>Administração:</span>
                        </p>

                        {prescription.Executor ? (
                            <div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Executor</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>
                                                {dayjs(prescription.executionDate).format("DD/MM/YYYY [às] HH:mm:ss")}
                                            </td>
                                            <td>{prescription.Executor.user.name}</td>
                                        </tr>
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
                            <Button text="Executar" color="cyan" handle={handleExecutePrescription} isLoading={true} />
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
            const action = setRealizedNursePrescription(prescription);
            dispatch(action);
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CardNursePrescription);
