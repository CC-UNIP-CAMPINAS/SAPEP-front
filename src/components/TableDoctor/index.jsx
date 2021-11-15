import React from "react";
import { connect } from "react-redux";
import { Popup } from "reactjs-popup";
import CardAddDoctor from "../CardAddDoctor";
import Button from "../Button/Button";
import ModalDoctorInformation from "../ModalDoctorInformation";
import "./styles.scoped.scss";

function TableDoctor({ header = ["Id", "Nome", "Email", "CRM", "Área", "Sexo", "Telefone"], doctors = [] }) {
    const [isCheck, setIsCheck] = React.useState(true);
    const modalAddRef = React.useRef();
    const openAddModal = () => modalAddRef.current.open();
    const closeAddModal = () => modalAddRef.current.close();

    const modalInformationRef = React.useRef();
    const openInformationModal = () => modalInformationRef.current.open();
    const closeInformationModal = () => modalInformationRef.current.close();

    const [activeDoctor, setActiveDoctor] = React.useState(doctors[0]);

    function handleSelectRow(id) {
        const foundDoctor = doctors.find((doctor) => doctor.userId === id);
        if (foundDoctor) {
            setActiveDoctor(foundDoctor);
            openInformationModal();
        }
    }

    function handleShowDoctor() {
        if (!isCheck) {
            return doctors;
        } else {
            return doctors.filter((doctor) => doctor.user.active);
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
            <section id="buttons">
                <span>
                    <Button text="Adicionar Médico" color="cyan" handle={openAddModal} />
                </span>
                <div />
                <p>Somente médicos ativos</p>
                <input type="checkbox" checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
                <Popup ref={modalAddRef} modal>
                    <CardAddDoctor close={closeAddModal} />
                </Popup>
            </section>
            <section id="table">
                <table>
                    <Popup ref={modalInformationRef} modal>
                        <ModalDoctorInformation doctor={activeDoctor} closeModal={closeInformationModal} />
                    </Popup>
                    <thead>
                        <tr>
                            {header.map((row, index) => {
                                return <th key={index}>{row}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {handleShowDoctor().map((doctor, index) => {
                            return (
                                <tr
                                    key={index}
                                    className={doctor.user.active ? "" : "disable"}
                                    onClick={() => handleSelectRow(doctor.userId)}
                                >
                                    <td>{doctor.userId}</td>
                                    <td>{doctor.user.name}</td>
                                    <td>{doctor.user.email}</td>
                                    <td>{doctor.crm}</td>
                                    <td>{doctor.area}</td>
                                    <td>{doctor.user.gender}</td>
                                    <td>{doctor.user.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {handleShowDoctor().length > 0 ? "" : emptyMessage}
            </section>
        </section>
    );
}

const mapStateToProps = (states) => {
    return {
        doctors: states.doctors,
    };
};

export default connect(
    mapStateToProps,
    null
)(TableDoctor);
