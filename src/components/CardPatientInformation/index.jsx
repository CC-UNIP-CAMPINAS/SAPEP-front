import dayjs, { utc } from "dayjs";
import React from "react";
import "./styles.scoped.scss";

function CardPatientInformation({ patient }) {
    dayjs.extend(utc);

    return (
        <section className="container">
            <span>Nome: </span>
            <p>{patient.name + " " + patient.lastName}</p>
            <span>Endereço:</span>
            <p>
                {patient.address +
                    ", " +
                    patient.addressNumber +
                    ", " +
                    patient.cep +
                    " Complemento: " +
                    patient.complement}
            </p>
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
