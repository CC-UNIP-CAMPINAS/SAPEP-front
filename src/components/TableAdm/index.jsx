import React from "react";
import { connect } from "react-redux";
import { Popup } from "reactjs-popup";
import Button from "../Button/Button";
import CardAddAdm from "../CardAddAdm";
import ModalAdmInformation from "../ModalAdmInformation";
import "./styles.scoped.scss";

function TableAdm({ header = ["Id", "Nome", "Email", "Sexo", "Telefone"], adms = [] }) {
    const [isCheck, setIsCheck] = React.useState(true);
    const modalAddRef = React.useRef();
    const openAddModal = () => modalAddRef.current.open();
    const closeAddModal = () => modalAddRef.current.close();

    const modalInformationRef = React.useRef();
    const openInformationModal = () => modalInformationRef.current.open();
    const closeInformationModal = () => modalInformationRef.current.close();

    const [activeAdm, setActiveAdm] = React.useState(adms[0]);

    function handleSelectRow(id) {
        const foundAdm = adms.find((adm) => adm.userId === id);
        if (foundAdm) {
            setActiveAdm(foundAdm);
            openInformationModal();
        }
    }

    function handleShowAdm() {
        if (!isCheck) {
            return adms;
        } else {
            return adms.filter((adm) => adm.active);
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
                    <Button text="Adicionar Usuário" color="cyan" handle={openAddModal} />
                </span>
                <div />
                <p>Somente usuários ativos</p>
                <input type="checkbox" checked={isCheck} onChange={() => setIsCheck(!isCheck)} />
                <Popup ref={modalAddRef} modal>
                    <CardAddAdm close={closeAddModal} />
                </Popup>
            </section>
            <section id="table">
                <table>
                    <Popup ref={modalInformationRef} modal>
                        <ModalAdmInformation adm={activeAdm} closeModal={closeInformationModal} />
                    </Popup>
                    <thead>
                        <tr>
                            {header.map((row, index) => {
                                return <th key={index}>{row}</th>;
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {handleShowAdm().map((adm, index) => {
                            return (
                                <tr
                                    key={index}
                                    className={adm.active ? "" : "disable"}
                                    onClick={() => handleSelectRow(adm.userId)}
                                >
                                    <td>{adm.userId}</td>
                                    <td>{adm.user.name}</td>
                                    <td>{adm.user.email}</td>
                                    <td>{adm.user.gender}</td>
                                    <td>{adm.user.phone}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                {handleShowAdm().length > 0 ? "" : emptyMessage}
            </section>
        </section>
    );
}

const mapStateToProps = (states) => {
    return {
        adms: states.adms,
    };
};

export default connect(
    mapStateToProps,
    null
)(TableAdm);
