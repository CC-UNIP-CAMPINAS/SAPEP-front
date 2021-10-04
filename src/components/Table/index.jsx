import React from "react";
import { Popup } from "reactjs-popup";
import CardTableRowInformation from "../CardTableRowInformation/index";
import "./styles.scoped.scss";

function Table({ header = [], doctors = [] }) {
    const modalRef = React.useRef();
    const openModal = () => modalRef.current.open();
    const closeModal = () => modalRef.current.close();
    const [selectedRow, setSelectedRow] = React.useState("");

    function handleSelectRow() {
        openModal();
    }

    return (
        <table className="container">
            <Popup ref={modalRef} modal>
                <CardTableRowInformation information={{ name: "Leonardo" }} />
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
                        <tr key={index} onClick={handleSelectRow}>
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
    );
}

export default Table;
