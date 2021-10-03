import React from "react";

import "./styles.scoped.scss";
import { Popup } from "reactjs-popup";
import CardTableRowInformation from "../CardTableRowInformation/index";

function Table() {
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
                    <th>Id</th>
                    <th>Nome</th>
                    <th>CRM</th>
                    <th>Área</th>
                    <th>Sexo</th>
                    <th>Telefone</th>
                </tr>
            </thead>
            <tbody>
                <tr onClick={handleSelectRow}>
                    <td>1</td>
                    <td>Júlia Nobre Colnaghi</td>
                    <td>210637 - SP</td>
                    <td>Pediatria</td>
                    <td>F</td>
                    <td>(19) 98874-2590</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Table;
