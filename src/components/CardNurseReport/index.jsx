import React from "react";
import "./styles.scoped.scss";

function CardNurseReport() {
    return (
        <div className="container">
            <header>
                <p>Relatório de Enfermagem</p>
            </header>
            <section>
                <div id="content">
                    <main>
                        <p>
                            <span>Enfermeiro(a): </span>Leonardo Petta do Nascimento
                        </p>
                        <p>
                            <span>Data do relatório: </span>23/10/2021 às 12:00
                        </p>
                    </main>

                    <div>
                        <p>
                            <span>Relatório: </span>Realizada mudança de decubito para decubito lateral direito.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default CardNurseReport;
