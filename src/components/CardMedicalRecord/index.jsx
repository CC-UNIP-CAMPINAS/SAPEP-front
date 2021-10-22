import dayjs, { utc } from "dayjs";
import React from "react";
import "./styles.scoped.scss";

function CardMedicalRecord() {
    dayjs.extend(utc);

    const [date, setDate] = React.useState(dayjs().format("YYYY-MM-DD"));

    const emptyMessage = (
        <div id="empty-message">
            <h1>Vazio!</h1>
            <h2>Não há nenhum dado disponível para esta data.</h2>
        </div>
    );

    return (
        <section className="container">
            <div id="date-selector">
                <div>
                    <h1>Prontuário do paciente</h1>
                </div>
                <div>
                    <label>Data dos dados: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <div id="content">{emptyMessage}</div>
        </section>
    );
}

export default CardMedicalRecord;
