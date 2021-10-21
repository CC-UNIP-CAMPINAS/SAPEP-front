import * as yup from "yup";
import { notification } from "./toastify";
import types from "./types";

const emailMatch = "Digite um email válido";
const emailEmpty = "O email não pode ser vazio";

const cepMatch = "O CEP precisa ser: XXXXX-XXX";

const nameMatch = "O nome precisa ter no mínimo 3 letras!";
const nameEmpty = "O nome não pode ser vazio";

const lastNameMatch = "O sobrenome precisa ter no mínimo 3 letras!";
const lastNameEmpty = "O sobrenome não pode ser vazio";

const crmMatch = "O CRM precisa ser: XXXXX - UF ";
const crmEmpty = "O CRM não pode ser vazio";

const corenMatch = "O COREN precisa ser: XXXXX - UF ";
const corenEmpty = "O COREN não pode ser vazio";

const areaMatch = "A Área precisa ter no mínimo 3 letras!";
const areaEmpty = "A Area não pode ser vazia.";

const genderMatch = "Escolha um gênero válido.";
const genderEmpty = "O gênero precisar ser informado.";

const birthdayMatch = "Coloque uma data de nascimento válida.";
const birthdayEmpty = "A data de nascimento não pode ser vazia. ";

//const phoneEmpty = "O telefone não pode ser vazio";
const phoneMatch = "O telefone precisa ter no mínimo 11 caracteres. Ex. DDD + 9 Dígitos.";

const cpfEmpty = "O CPF não pode ser vazio";
const cpfMatch = "O CPF precisa ter no mínimo 11 caracteres. Ex. 000.000.000-00";

const rgEmpty = "O RG não pode ser vazio";
const rgMatch = "O RG precisa ter no mínimo 9 caracteres. Ex. 00.000.000-0";

const passwordEmpty = "A senha não pode ser vazia!";
const passwordMatch = "A senha precisa ter no mínimo 8 caracteres!";

const schemaSign = yup.object().shape({
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    lastName: yup.string().required(lastNameEmpty),
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    password: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch),
    cpf: yup
        .string()
        .required(cpfEmpty)
        .min(14, cpfMatch),
    rePassword: yup
        .string()
        .required(passwordEmpty)
        .test("passwords-match", "Senhas diferem!", function(value) {
            return this.parent.password === value;
        }),
});

const schemaLogin = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    password: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch),
});

const schemaCreateDoctor = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    password: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch),
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    crm: yup
        .string()
        .required(crmEmpty)
        .min(6, crmMatch),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    area: yup
        .string()
        .required(areaEmpty)
        .min(3, areaMatch),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

const schemaCreateNurse = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    password: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch),
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    coren: yup
        .string()
        .required(corenEmpty)
        .min(6, corenMatch),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

const schemaCreateAdm = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    password: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch),
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

const schemaUpdateAdm = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

const schemaCreatePatient = yup.object().shape({
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    lastName: yup
        .string()
        .required(lastNameEmpty)
        .min(3, lastNameMatch),
    cep: yup
        .string()
        .optional()
        .min(9, cepMatch),
    complement: yup.string().optional(),
    addressNumber: yup.number().optional(),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    birthday: yup
        .string()
        .required(birthdayEmpty)
        .min(10, birthdayMatch)
        .max(10, birthdayMatch),
    cpf: yup
        .string()
        .required(cpfEmpty)
        .min(14, cpfMatch)
        .max(14, cpfMatch),
    rg: yup
        .string()
        .required(rgEmpty)
        .min(12, rgMatch)
        .max(12, rgMatch),
    healthInsurance: yup.string().optional(),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

const schemaUpdatePatient = yup.object().shape({
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    lastName: yup
        .string()
        .required(lastNameEmpty)
        .min(3, lastNameMatch),
    cep: yup
        .string()
        .optional()
        .min(9, cepMatch),
    complement: yup.string().optional(),
    addressNumber: yup.number().optional(),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    birthday: yup
        .string()
        .required(birthdayEmpty)
        .min(10, birthdayMatch)
        .max(10, birthdayMatch),
    cpf: yup
        .string()
        .required(cpfEmpty)
        .min(14, cpfMatch)
        .max(14, cpfMatch),
    rg: yup
        .string()
        .required(rgEmpty)
        .min(12, rgMatch)
        .max(12, rgMatch),
    healthInsurance: yup.string().optional(),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

const schemaUpdateDoctor = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    crm: yup
        .string()
        .required(crmEmpty)
        .min(6, crmMatch),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    area: yup
        .string()
        .required(areaEmpty)
        .min(3, areaMatch),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

const schemaUpdateNurse = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
    name: yup
        .string()
        .required(nameEmpty)
        .min(3, nameMatch),
    coren: yup
        .string()
        .required(corenEmpty)
        .min(6, corenMatch),
    phone: yup
        .string()
        .optional()
        .min(15, phoneMatch)
        .max(15, phoneMatch),
    gender: yup
        .string()
        .required(genderEmpty)
        .matches(/(F|M|INDEFINIDO)/, genderMatch),
});

async function validate(schemaName, body) {
    try {
        switch (schemaName) {
            case "login":
                return await schemaLogin.validate(body);
            case "create-doctor":
                return await schemaCreateDoctor.validate(body);
            case "create-nurse":
                return await schemaCreateNurse.validate(body);
            case "create-patient":
                return await schemaCreatePatient.validate(body);
            case "create-adm":
                return await schemaCreateAdm.validate(body);
            case "update-patient":
                return await schemaUpdatePatient.validate(body);
            case "update-adm":
                return await schemaUpdateAdm.validate(body);
            case "update-doctor":
                return await schemaUpdateDoctor.validate(body);
            case "update-nurse":
                return await schemaUpdateNurse.validate(body);
            case "sign":
                return await schemaSign.validate(body);
            default:
                return false.valueOf;
        }
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            notification(types.INFO, error.message);
            return false;
        }
    }
}

export default validate;
