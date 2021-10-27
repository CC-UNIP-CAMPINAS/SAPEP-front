import React from "react";
import { connect } from "react-redux";
import { useParams } from "react-router";
import Popup from "reactjs-popup";
import Button from "../../components/Button/Button";
import CardAddMedicalPrescription from "../../components/CardAddMedicalPrescription";
import CardAddTeamReport from "../../components/CardAddTeamReport";
import CardMedicalRecord from "../../components/CardMedicalRecord";
import CardPatientInformation from "../../components/CardPatientInformation";
import "./styles.scoped.scss";

function Patient({ patients }) {
    const modalMedicalPrescription = React.useRef();
    const openMedicalPrescriptionModal = () => modalMedicalPrescription.current.open();
    const closeMedicalPrescriptionModal = () => modalMedicalPrescription.current.close();

    const modalTeamReport = React.useRef();
    const openTeamReportModal = () => modalTeamReport.current.open();
    const closeTeamReportModal = () => modalTeamReport.current.close();

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
                        <Button text="Adicionar Prescrição" color="cyan" handle={openMedicalPrescriptionModal} />
                    </span>
                    <span>
                        <Button text="Adicionar Relatório da Equipe" color="cyan" handle={openTeamReportModal} />
                    </span>
                </header>
                <Popup ref={modalMedicalPrescription} modal>
                    <CardAddMedicalPrescription close={closeMedicalPrescriptionModal} medicalRecordId={patient?.MedicalRecord?.id} />
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
    };
};

export default connect(
    mapStateToProps,
    null
)(Patient);
