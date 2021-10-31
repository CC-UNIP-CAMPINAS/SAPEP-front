import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import Popup from "reactjs-popup";
import Button from "../../components/Button/Button";
import CardAddMedicalPrescription from "../../components/CardAddMedicalPrescription";
import CardAddNursePrescription from "../../components/CardAddNursePrescription";
import CardAddNurseReport from "../../components/CardAddNurseReport";
import CardAddTeamReport from "../../components/CardAddTeamReport";
import CardMedicalRecord from "../../components/CardMedicalRecord";
import CardPatientInformation from "../../components/CardPatientInformation";
import "./styles.scoped.scss";

function Patient({ patients, user }) {
    const modalPrescription = React.useRef();
    const openModalPrescription = () => modalPrescription.current.open();
    const closeModalPrescription = () => modalPrescription.current.close();

    const modalTeamReport = React.useRef();
    const openTeamReportModal = () => modalTeamReport.current.open();
    const closeTeamReportModal = () => modalTeamReport.current.close();

    const modalNurseReport = React.useRef();
    const openNurseReportModal = () => modalNurseReport.current.open();
    const closeNurseReportModal = () => modalNurseReport.current.close();

    let { id } = useParams();

    function handlePatient() {
        const patient = patients.find((patient) => patient.id === +id);
        if (patient) {
            return patient;
        }
    }

    const patient = handlePatient();

    return (
        <div className="container">
            <section id="information">
                <CardPatientInformation patient={patient} />
            </section>
            <section id="medical-record">
                <header>
                    <span>
                        <Button text="Adicionar Prescrição" color="cyan" handle={openModalPrescription} />
                    </span>
                    {user.groupId === 2 ? (
                        <span>
                            <Button
                                text="Adicionar Relatório de Enfermagem"
                                color="cyan"
                                handle={openNurseReportModal}
                            />
                        </span>
                    ) : (
                        ""
                    )}
                    <span>
                        <Button text="Adicionar Relatório da Equipe" color="cyan" handle={openTeamReportModal} />
                    </span>
                </header>
                <Popup ref={modalPrescription} modal>
                    {user.groupId === 1 ? (
                        <CardAddMedicalPrescription
                            close={closeModalPrescription}
                            medicalRecordId={patient?.MedicalRecord?.id}
                        />
                    ) : (
                        <CardAddNursePrescription
                            close={closeModalPrescription}
                            medicalRecordId={patient?.MedicalRecord?.id}
                        />
                    )}
                </Popup>
                <Popup ref={modalNurseReport} modal>
                    <CardAddNurseReport close={closeNurseReportModal} medicalRecordId={patient?.MedicalRecord?.id} />
                </Popup>
                <Popup ref={modalTeamReport} modal>
                    <CardAddTeamReport close={closeTeamReportModal} medicalRecordId={patient?.MedicalRecord?.id} />
                </Popup>
                <CardMedicalRecord medicalRecord={patient.MedicalRecord} />
            </section>
        </div>
    );
}

const mapStateToProps = (states) => {
    return {
        patients: states.patients,
        user: states.user,
    };
};

export default connect(
    mapStateToProps,
    null
)(Patient);
