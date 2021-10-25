import dayjs, { utc } from "dayjs";
import React from "react";
import CardMedicalPrescription from "../CardMedicalPrescription/index";
import CardNursePrescription from "../CardNursePrescription";
import CardNurseReport from "../CardNurseReport";
import CardTeamReport from "../CardTeamReport";
import "./styles.scoped.scss";

function CardMedicalRecord({ medicalRecord }) {
    dayjs.extend(utc);

    const [date, setDate] = React.useState(dayjs().format("YYYY-MM-DD"));

    function joinContent() {
        const selectedDate = dayjs.utc(date);

        const medicalPrescription = medicalRecord.MedicalPrescription.filter((item) => {
            if (selectedDate.isSame(dayjs.utc(item.prescriptionDate))) {
                return item;
            }

            return 0;
        }).map((item) => ({ ...item, type: "MEDICAL_PRESCRIPTION" }));

        const teamReport = medicalRecord.TeamReport.filter((item) => {
            if (selectedDate.isSame(dayjs.utc(item.reportDate))) {
                return item;
            }

            return 0;
        }).map((item) => ({ ...item, type: "TEAM_REPORT" }));

        return [...medicalPrescription, ...teamReport];
    }

    const content = joinContent();

    console.log(content);

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
            <div id="content">
                {/*{content.length > 0 ? "" : emptyMessage}*/}
                <CardMedicalPrescription />
                <CardTeamReport />
                <CardNurseReport />
                <CardNursePrescription />
            </div>
        </section>
    );
}

export default CardMedicalRecord;
