import { Icon } from "@iconify/react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";
import PatientInPdf from "../../pages/Patient/pdfVersion";
import CardMedicalPrescription from "../CardMedicalPrescription/index";
import CardNursePrescription from "../CardNursePrescription";
import CardNurseReport from "../CardNurseReport";
import CardTeamReport from "../CardTeamReport";
import "./styles.scoped.scss";

function CardMedicalRecord({ patient, medicalRecord }) {
    const [date, setDate] = React.useState(dayjs().format("YYYY-MM-DD"));

    function joinContent() {
        const selectedDate = dayjs(date);

        const medicalPrescription = medicalRecord.MedicalPrescription.filter((item) => {
            if (selectedDate.isSame(dayjs(item.prescriptionDate), "day")) {
                return item;
            }

            return 0;
        }).map((item) => ({ ...item, type: "MEDICAL_PRESCRIPTION", date: item.prescriptionDate }));

        const nursePrescription = medicalRecord.NursePrescription.filter((item) => {
            if (selectedDate.isSame(dayjs(item.prescriptionDate), "day")) {
                return item;
            }

            return 0;
        }).map((item) => ({ ...item, type: "NURSE_PRESCRIPTION", date: item.prescriptionDate }));

        const teamReport = medicalRecord?.TeamReport?.filter((item) => {
            if (selectedDate.isSame(dayjs(item.reportDate), "day")) {
                return item;
            }

            return 0;
        }).map((item) => {
            return { ...item, type: "TEAM_REPORT", date: item.reportDate };
        });

        const nurseReport = medicalRecord?.NurseReport?.filter((item) => {
            if (selectedDate.isSame(dayjs(item.reportDate), "day")) {
                return item;
            }

            return 0;
        }).map((item) => {
            return { ...item, type: "NURSE_REPORT", date: item.reportDate };
        });

        return [...medicalPrescription, ...nursePrescription, ...teamReport, ...nurseReport].sort((a, b) => {
            return dayjs(a.date).toDate() - dayjs(b.date).toDate();
        });
    }

    const content = joinContent();

    const emptyMessage = (
        <div id="empty-message">
            <h1>Vazio!</h1>
            <h2>N??o h?? nenhum dado dispon??vel para esta data.</h2>
        </div>
    );

    return (
        <section className="container">
            <div id="date-selector">
                <div id="div-title">
                    <h1>Prontu??rio do paciente </h1>
                    {date ? (
                        <PDFDownloadLink
                            document={<PatientInPdf patient={patient} date={date} />}
                            fileName={`${dayjs(date).format("DD-MM-YYYY")} - Prontu??rio de ${patient.name} ${
                                patient.lastName
                            }.pdf`}
                        >
                            {({ blob, url, loading, error }) =>
                                loading ? (
                                    <button id="button-download-medical-record" title="Download do prontu??rio">
                                        Carregando PDF...
                                    </button>
                                ) : (
                                    <button id="button-download-medical-record" title="Download do prontu??rio">
                                        <Icon icon="bi:cloud-download-fill" />
                                    </button>
                                )
                            }
                        </PDFDownloadLink>
                    ) : (
                        ""
                    )}
                </div>
                <div>
                    <label>Data dos dados: </label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
            </div>
            <div id="content">
                {content.length > 0
                    ? content.map((item, index) => {
                          switch (item.type) {
                              case "MEDICAL_PRESCRIPTION":
                                  return <CardMedicalPrescription key={index} prescription={item} />;
                              case "NURSE_PRESCRIPTION":
                                  return <CardNursePrescription key={index} prescription={item} />;
                              case "TEAM_REPORT":
                                  return <CardTeamReport key={index} report={item} />;
                              default:
                                  //NURSE_REPORT
                                  return <CardNurseReport key={index} report={item} />;
                          }
                      })
                    : emptyMessage}
            </div>
        </section>
    );
}

export default CardMedicalRecord;
