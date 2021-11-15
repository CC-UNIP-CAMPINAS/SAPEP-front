import dayjs from "dayjs";
import React from "react";
import "./styles.scoped.scss";

function CardTeamReport({ report }) {
    return (
        <div className="container">
            <header>
                <p>Relatório da Equipe</p>
            </header>
            <section>
                <div id="content">
                    <main>
                        <p>
                            <span>Colaborador: </span>
                            {report.signatory.name}
                        </p>
                        <p>
                            <span>Data do relatório: </span>
                            {dayjs(report.date).format("DD/MM/YYYY [às] HH:mm:ss")}
                        </p>
                    </main>

                    <div>
                        <p>
                            <span>Relatório: </span>
                            {report.report}
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CardTeamReport;
