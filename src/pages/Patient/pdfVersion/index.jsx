import { Document, Image, Page, StyleSheet, Text, View } from "@react-pdf/renderer";
import dayjs from "dayjs";
import React from "react";

function PatientInPdf({ patient, date }) {
    // Create styles
    const styles = StyleSheet.create({
        page: {
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f3f3f3",
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1,
        },
        header: { fontSize: "40px", alignSelf: "center", marginBottom: "20px" },
        image: {
            alignSelf: "center",
            width: "100px",
            height: "100px",
        },
    });

    const medicalRecord = patient.MedicalRecord;

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

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Image style={styles.image} src={"/logo.png"} />
                    <Text style={styles.header}>Prontuário do Paciente</Text>
                    <View style={(styles.section, { border: "1px solid #545454", padding: "10px" })}>
                        <Text>
                            Nome: {patient.name} {patient.lastName}
                        </Text>
                        <Text>Endereço: {patient.address}</Text>
                        <Text>Telefone: {patient.phone}</Text>
                        <Text>
                            Data de Nascimento:{" "}
                            {patient.birthday ? dayjs.utc(patient.birthday).format("DD/MM/YYYY") : "---"}
                        </Text>
                        <Text>CPF: {patient.cpf}</Text>
                        <Text>RG: {patient.rg}</Text>
                        <Text>Convênio: {patient.healthInsurance}</Text>
                        <Text>Gênero: {patient.gender}</Text>
                    </View>
                    <View
                        style={
                            (styles.section,
                            {
                                border: "1px solid #545454",
                                padding: "10px",
                                margin: "20px 0",
                                width: "270px",
                            })
                        }
                    >
                        <Text>Data do prontuário: {dayjs(date).format("DD/MM/YYYY")}</Text>
                    </View>
                    <View
                        style={
                            (styles.section,
                            {
                                margin: "20px 0",
                            })
                        }
                    >
                        {content.length > 0 ? (
                            content.map((item, index) => {
                                switch (item.type) {
                                    case "NURSE_PRESCRIPTION":
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    border: "1px solid rgb(41, 187, 255)",
                                                    borderLeft: "20px solid rgb(41, 187, 255)",
                                                    background: "#fff",
                                                    padding: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <Text style={{ fontSize: "20px", marginBottom: "10px" }}>
                                                    Prescrição de Enfermagem
                                                </Text>

                                                <Text>Prescritor: {item.Prescriber.user.name}</Text>
                                                <Text style={{ marginBottom: "10px" }}>
                                                    Data da prescrição:{" "}
                                                    {dayjs(item.prescriptionDate).format("DD/MM/YYYY [às] HH:mm:ss")}
                                                </Text>
                                                <Text>Prescrição: {item.prescription}</Text>
                                                <Text style={{ marginBottom: "10px" }}>Observação: {item.obs}</Text>
                                                <Text style={{ marginBottom: "10px" }}>Administração: </Text>
                                                {item.Executor ? (
                                                    <View>
                                                        <Text>
                                                            Data:{" "}
                                                            {dayjs(item.executionDate).format(
                                                                "DD/MM/YYYY [às] HH:mm:ss"
                                                            )}{" "}
                                                            Executor: {item.Executor.user.name}
                                                        </Text>
                                                    </View>
                                                ) : (
                                                    <Text>Nenhuma administração. </Text>
                                                )}
                                            </View>
                                        );
                                    case "MEDICAL_PRESCRIPTION":
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    border: "1px solid #157992",
                                                    borderLeft: "20px solid #157992",
                                                    background: "#fff",
                                                    padding: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    marginBottom: "20px",
                                                }}
                                            >
                                                <Text style={{ fontSize: "20px", marginBottom: "10px" }}>
                                                    Prescrição Médica
                                                </Text>

                                                <Text>Prescritor: {item.Prescriber.user.name}</Text>
                                                <Text style={{ marginBottom: "10px" }}>
                                                    Data da prescrição:{" "}
                                                    {dayjs(item.date).format("DD/MM/YYYY [às] HH:mm:ss")}
                                                </Text>
                                                <Text>Medicamento: {item.drug}</Text>
                                                <Text>Dosagem: {item.drugDosage}</Text>
                                                <Text>Via de administração: {item.drugWay}</Text>
                                                <Text>Intervalo de administração: {item.administrationInterval}</Text>
                                                <Text style={{ marginBottom: "10px" }}>Observação: {item.obs}</Text>
                                                <Text style={{ marginBottom: "10px" }}>
                                                    Administrações:{" "}
                                                    {item.realized ? (
                                                        <Text>
                                                            {` Administrado ${item.Executors.length}/${
                                                                item.administrationCount
                                                            }`}
                                                        </Text>
                                                    ) : (
                                                        <Text>
                                                            {` Aguardando administração ${item.Executors.length}/${
                                                                item.administrationCount
                                                            }`}
                                                        </Text>
                                                    )}
                                                </Text>
                                                {item.Executors.length ? (
                                                    item.Executors.map((executor, index) => (
                                                        <View key={index}>
                                                            <Text>
                                                                Data:{" "}
                                                                {dayjs(executor.executionDate).format(
                                                                    "DD/MM/YYYY [às] HH:mm:ss"
                                                                )}{" "}
                                                                Executor: {executor.Executor.user.name}
                                                            </Text>
                                                        </View>
                                                    ))
                                                ) : (
                                                    <Text>Nenhuma administração. </Text>
                                                )}
                                            </View>
                                        );
                                    case "TEAM_REPORT":
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    border: "1px solid rgb(21, 75, 146)",
                                                    borderLeft: "20px solid rgb(21, 75, 146)",
                                                    background: "#fff",
                                                    marginBottom: "20px",
                                                    padding: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <Text style={{ fontSize: "20px", marginBottom: "10px" }}>
                                                    Relatório da Equipe
                                                </Text>
                                                <Text>Colaborador (a): {item.signatory.name}</Text>
                                                <Text>Data: {dayjs(item.date).format("DD/MM/YYYY [às] HH:mm:ss")}</Text>
                                                <Text>Relatório: {item.report}</Text>
                                            </View>
                                        );
                                    default:
                                        //NURSE_REPORT
                                        return (
                                            <View
                                                key={index}
                                                style={{
                                                    border: "1px solid #0081cb",
                                                    borderLeft: "20px solid #0081cb",
                                                    background: "#fff",
                                                    marginBottom: "20px",
                                                    padding: "20px",
                                                    display: "flex",
                                                    flexDirection: "column",
                                                }}
                                            >
                                                <Text style={{ fontSize: "20px", marginBottom: "10px" }}>
                                                    Relatório de Enfermagem
                                                </Text>
                                                <Text>Enfermeiro (a): {item.signatory.user.name}</Text>
                                                <Text>Data: {dayjs(item.date).format("DD/MM/YYYY [às] HH:mm:ss")}</Text>
                                                <Text>Relatório: {item.report}</Text>
                                            </View>
                                        );
                                }
                            })
                        ) : (
                            <Text />
                        )}
                    </View>
                </View>
            </Page>
        </Document>
    );
}

// Executor:
// user:
// name: "Júlia Nobre Colnaghi"
// [[Prototype]]: Object
// [[Prototype]]: Object
// executionDate: "2021-11-01T21:12:25.000Z"
// [[Prototype]]: Object
// 1: {executionDate: '2021-11-01T21:13:26.000Z', Executor: {…}}
// 2: {executionDate: '2021-11-01T21:13:31.000Z', Executor: {…}}
// 3: {executionDate: '2021-11-01T21:13:34.000Z', Executor: {…}}
// length: 4
// [[Prototype]]: Array(0)
// Prescriber:
// user:
// name: "Leonardo Petta do Nascimento"
// [[Prototype]]: Object
// [[Prototype]]: Object
// administrationCount: 4
// administrationInterval: "6/6H"
// date: "2021-11-01T21:11:44.635Z"
// drug: "Ibuprofeno"
// drugDosage: "500mg"
// drugWay: "VO"
// id: 4
// obs: "Diluir em SF 0.9%"
// prescriptionDate: "2021-11-01T21:11:44.635Z"
// realized: true
// type: "MEDICAL_PRESCRIPTION"

export default PatientInPdf;
