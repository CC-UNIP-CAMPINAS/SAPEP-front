import React from "react";
import "./styles.scoped.scss";

function CardTeamReport() {
    return (
        <div className="container">
            <header>
                <p>Relatório da Equipe</p>
            </header>
            <section>
                <div id="content">
                    <main>
                        <p>
                            <span>Colaborador: </span>Leonardo Petta do Nascimento
                        </p>
                        <p>
                            <span>Data do relatório: </span>23/10/2021 às 12:00
                        </p>
                    </main>

                    <div>
                        <p>
                            <span>Relatório: </span>Procedimento e informações pertinentes ao paciente.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CardTeamReport;
