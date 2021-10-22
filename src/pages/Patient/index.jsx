import React from "react";
import CardPatientInformation from "../../components/CardPatientInformation";
import "./styles.scoped.scss";
import { connect } from "react-redux";
import { useParams } from "react-router";
import CardMedicalRecord from "../../components/CardMedicalRecord";
import Button from "../../components/Button/Button";

function Patient({ patients }) {
    let { id } = useParams();

    function handlePatient() {
        const patient = patients.find((patient) => patient.id === +id);
        if (patient) {
            return patient;
        }
    }

    return (
        <div className="container">
            <section id="information">
                <CardPatientInformation patient={handlePatient()} />
            </section>
            <section id="medical-record">
                <header>
                    <span>
                        <Button text="Adicionar Prescrição" color="cyan" handle={() => {}} />
                    </span>
                    <span>
                        <Button text="Adicionar Relatório da equipe" color="cyan" handle={() => {}} />
                    </span>
                </header>

                <CardMedicalRecord />
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
