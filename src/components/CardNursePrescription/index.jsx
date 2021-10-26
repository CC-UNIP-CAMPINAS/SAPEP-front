import React from "react";
import "./styles.scoped.scss";
import { Icon } from "@iconify/react";
import dayjs from "dayjs";

function CardNursePrescription({ prescription }) {
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
                            {dayjs(prescription.prescriptionDate).format("DD/MM/YYYY [ás] HH:mm:ss")}
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
                                        <td>{dayjs(prescription.executionDate).format("DD/MM/YYYY [ás] HH:mm:ss")}</td>
                                        <td>{prescription.Executor.user.name}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p>Nenhuma administração.</p>
                    )}
                </div>
            </section>
        </div>
    );
}

export default CardNursePrescription;
