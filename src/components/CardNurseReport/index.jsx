import dayjs from "dayjs";
import React from "react";
import "./styles.scoped.scss";

function CardNurseReport({ report }) {
    return (
        <div className="container">
            <header>
                <p>Relatório de Enfermagem</p>
            </header>
            <section>
                <div id="content">
                    <main>
                        <p>
                            <span>Enfermeiro(a): </span>
                            {report.signatory.user.name}
                        </p>
                        <p>
                            <span>Data do relatório: </span>
                            {dayjs(report.date).format("DD/MM/YYYY [ás] HH:mm:ss")}
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

export default CardNurseReport;
