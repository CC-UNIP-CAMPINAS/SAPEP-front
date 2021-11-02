import { Icon } from "@iconify/react";
import dayjs, { utc } from "dayjs";
import React from "react";
import { useHistory } from "react-router";
import "./styles.scoped.scss";

function CardPatientInformation({ patient }) {
    dayjs.extend(utc);
    const history = useHistory();

    return (
        <section className="container">
            <div id="button-return" onClick={() => history.goBack()}>
                Voltar
                <Icon icon="ph:key-return-fill" />
            </div>
            <span>Nome: </span>
            <p>{patient.name + " " + patient.lastName}</p>
            <span>Endereço:</span>
            <p>{patient.address}</p>
            <span>Telefone:</span>
            <p>{patient.phone}</p>
            <span>Data de Nascimento: </span>
            <p>{patient.birthday ? dayjs.utc(patient.birthday).format("DD/MM/YYYY") : "---"}</p>
            <span>CPF: </span>
            <p>{patient.cpf}</p>
            <span>RG: </span>
            <p>{patient.rg}</p>
            <span>Convênio: </span>
            <p>{patient.healthInsurance}</p>
            <span>Gênero: </span>
            <p>{patient.gender}</p>
        </section>
    );
}

export default CardPatientInformation;
