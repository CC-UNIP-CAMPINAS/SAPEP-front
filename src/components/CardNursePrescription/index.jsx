import React from "react";
import "./styles.scoped.scss";
import { Icon } from "@iconify/react";

function CardNursePrescription() {
    return (
        <div className="container">
            <header>
                <p>Prescrição de Enfermagem</p>
                {true ? (
                    <span>
                        <Icon icon="akar-icons:circle-check-fill" inline={true} color="#41e64e" /> Executado
                    </span>
                ) : (
                    <span>
                        <Icon icon="ant-design:clock-circle-filled" inline={true} color="#157992" /> Não executado
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
                            <span>Data da prescrição: </span>23/10/2021 às 12:00
                        </p>
                    </main>

                    <div>
                        <p>
                            <span>Prescrição: </span>Usar cobertura de carvão ativado na úlcera por pressão.
                        </p>
                        <p>
                            <span>Observação: </span>Nenhuma
                        </p>
                    </div>
                </div>

                <div id="administration">
                    <p>
                        <span>Administrações</span>
                    </p>
                    <div>
                        <table>
                            <thead>
                                <tr>
                                    <th>Data</th>
                                    <th>Executor</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr onClick={() => {}}>
                                    <td>24/10/2021 às 12:00</td>
                                    <td>Dr. Júlia Nobre Colnaghi</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CardNursePrescription;
