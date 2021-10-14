import React from "react";
import { connect } from "react-redux";
import { Popup } from "reactjs-popup";
import Button from "../Button/Button";
import CardAddNurse from "../CardAddNurse";
import ModalNurseInformation from "../ModalNurseInformation";
import "./styles.scoped.scss";

function TableNurse({ header = ["Id", "Nome", "Email", "COREN", "Sexo", "Telefone"], nurses = [] }) {
    const [isCheck, setIsCheck] = React.useState(true);
    const modalAddRef = React.useRef();
    const openAddModal = () => modalAddRef.current.open();
    const closeAddModal = () => modalAddRef.current.close();

    const modalInformationRef = React.useRef();
    const openInformationModal = () => modalInformationRef.current.open();
    const closeInformationModal = () => modalInformationRef.current.close();

    const [activeNurse, setActiveNurse] = React.useState(nurses[0]);

    function handleSelectRow(id) {
        const foundNurse = nurses.find((nurse) => nurse.userId === id);
        if (foundNurse) {
            setActiveNurse(foundNurse);
            openInformationModal();
        }
    }

    function handleShowNurse() {
        if (!isCheck) {
            return nurses;
        } else {
            return nurses.filter((nurse) => nurse.active);
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
                    <Button text="Adicionar Enfermeiro" color="cyan" handle={openAddModal} />
                </span>
                <div />
                <p>Somente enfermeiros ativos</p>
                <input type="checkbox" checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
                <Popup ref={modalAddRef} modal>
                    <CardAddNurse close={closeAddModal} />
                </Popup>
            </section>
            <section id="table">
                <table>
                    <Popup ref={modalInformationRef} modal>
                        <ModalNurseInformation nurse={activeNurse} closeModal={closeInformationModal} />
                    </Popup>
                    <thead>
                        <tr>
                            {header.map((row, index) => {
                                return <th key={index}>{row}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {handleShowNurse().map((nurse, index) => {
                            return (
                                <tr
                                    key={index}
                                    className={nurse.active ? "" : "disable"}
                                    onClick={() => handleSelectRow(nurse.userId)}
                                >
                                    <td>{nurse.userId}</td>
                                    <td>{nurse.user.name}</td>
                                    <td>{nurse.user.email}</td>
                                    <td>{nurse.coren}</td>
                                    <td>{nurse.user.gender}</td>
                                    <td>{nurse.user.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {handleShowNurse().length > 0 ? "" : emptyMessage}
            </section>
        </section>
    );
}

const mapStateToProps = (states) => {
    return {
        nurses: states.nurses,
    };
};

export default connect(
    mapStateToProps,
    null
)(TableNurse);
