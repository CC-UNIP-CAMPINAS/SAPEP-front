import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router";
import { Popup } from "reactjs-popup";
import Button from "../Button/Button";
import CardAddPatient from "../CardAddPatient";
import ModalPatientInformation from "../ModalPatientInformation";
import "./styles.scoped.scss";

function TablePatient({
    header = ["Id", "Nome", "Endereço", "Data Nasc.", "Telefone", "Convênio", "CPF", "RG", "Sexo"],
    patients = [],
    user,
}) {
    dayjs.extend(utc);

    const history = useHistory();

    const modalAddRef = React.useRef();
    const openAddModal = () => modalAddRef.current.open();
    const closeAddModal = () => modalAddRef.current.close();

    const modalInformationRef = React.useRef();
    const openInformationModal = () => modalInformationRef.current.open();
    const closeInformationModal = () => modalInformationRef.current.close();

    const [activePatient, setActivePatient] = React.useState(patients[0]);

    function handleSelectRow(id) {
        const foundPatient = patients.find((patient) => patient.id === id);
        if (foundPatient) {
            setActivePatient(foundPatient);
            switch (user.groupId) {
                case 1:
                    return history.push(`/patient/${id}`);
                default:
                    return openInformationModal();
            }
        }
    }

    const emptyMessage = (
        <div>
            <h1>Vazio!</h1>
            <h2>Não há nenhum dado disponível</h2>
        </div>
    );

    return (
        <section className="container">
            {user.groupId === 5 ? (
                <section id="buttons">
                    <span>
                        <Button text="Adicionar Paciente" color="cyan" handle={openAddModal} />
                    </span>
                    <div />
                    <Popup ref={modalAddRef} modal>
                        <CardAddPatient close={closeAddModal} />
                    </Popup>
                </section>
            ) : (
                <h1>Pacientes</h1>
            )}

            <section id="table">
                <table>
                    <Popup ref={modalInformationRef} modal>
                        <ModalPatientInformation patient={activePatient} closeModal={closeInformationModal} />
                    </Popup>
                    <thead>
                        <tr>
                            {header.map((row, index) => {
                                return <th key={index}>{row}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {patients.map((patient, index) => {
                            return (
                                <tr key={index} onClick={() => handleSelectRow(patient.id)}>
                                    <td>{patient.id}</td>
                                    <td>{patient.name + " " + patient.lastName}</td>
                                    <td>{patient.address}</td>
                                    <td>
                                        {patient.birthday ? dayjs.utc(patient.birthday).format("DD/MM/YYYY") : null}
                                    </td>
                                    <td>{patient.phone}</td>
                                    <td>{patient.healthInsurance}</td>
                                    <td>{patient.cpf}</td>
                                    <td>{patient.rg}</td>
                                    <td>{patient.gender}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {patients.length > 0 ? "" : emptyMessage}
            </section>
        </section>
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
)(TablePatient);
