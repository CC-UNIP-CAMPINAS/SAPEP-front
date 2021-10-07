import React from "react";
import { Popup } from "reactjs-popup";
import ModalDoctorInformation from "../ModalDoctorInformation/index";
import "./styles.scoped.scss";

function TableDoctor({ header = [], doctors = [] }) {
    const modalRef = React.useRef();
    const [activeDoctor, setActiveDoctor] = React.useState(doctors[1]);
    const openModal = () => modalRef.current.open();
    const closeModal = () => modalRef.current.close();

    function handleSelectRow(id) {
        const foundDoctor = doctors.find((doctor) => doctor.userId === id);
        if (foundDoctor) {
            setActiveDoctor(foundDoctor);
            openModal();
        }
    }

    const emptyMessage = (
        <div>
            <h1>Vazio!</h1>
            <h2>Não há nenhum dado disponível</h2>
        </div>
    );

    return (
        <>
            <table className="container">
                <Popup ref={modalRef} modal>
                    <ModalDoctorInformation doctor={activeDoctor} closeModal={closeModal} />
                </Popup>
                <thead>
                    <tr>
                        {header.map((row, index) => {
                            return <th key={index}>{row}</th>;
                        })}
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor, index) => {
                        return (
                            <tr
                                key={index}
                                className={doctor.active ? "" : "disable"}
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
            {doctors.length > 0 ? "" : emptyMessage}
        </>
    );
}

export default TableDoctor;
