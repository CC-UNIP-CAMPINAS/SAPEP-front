import { Icon } from "@iconify/react";
import React from "react";

import "./styles.scoped.scss";
import dayjs from "dayjs";

function CardMedicalPrescription({ prescription }) {
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
                            <span>Prescritor: </span>Leonardo Petta do Nascimento
                        </p>
                        <p>
                            <span>Data da prescrição: </span>
                            {dayjs(prescription.date).format("DD/MM/YYYY [ás] HH:mm:ss")}
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
                    <p>
                        <span>Administrações</span>
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
                                            <td>{dayjs(executor.executionDate).format("DD/MM/YYYY [ás] HH:mm:ss")}</td>
                                            <td>{executor.Executor.user.name}</td>
                                        </tr>
                                    ))}
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

export default CardMedicalPrescription;
