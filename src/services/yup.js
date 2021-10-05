import * as yup from "yup";
import { notification } from "./toastify";
import types from "./types";

const emailMatch = "Digite um email válido";
const emailEmpty = "O email não pode ser vazio";

const nameMatch = "O nome precisa ter no mínimo 3 letras!";
const nameEmpty = "O nome não pode ser vazio";

const crmMatch = "O CRM precisa ser: XXXXX - UF ";
const crmEmpty = "O CRM não pode ser vazio";

const areaMatch = "A Área precisa ter no mínimo 3 letras!";
const areaEmpty = "A Area não pode ser vazia.";

const lastNameEmpty = "O sobrenome não pode ser vazio";

//const phoneEmpty = "O telefone não pode ser vazio";
const phoneMatch = "O telefone precisa ter no mínimo 11 caractéres. Ex. DDD + 9 Dígitos.";

const cpfEmpty = "O CPF não pode ser vazio";
const cpfMatch = "O CPF precisa ter no mínimo 11 caractéres. Ex. 000.000.000-00";

const passwordEmpty = "A senha não pode ser vazia!";
const passwordMatch = "A senha precisa ter no mínimo 8 caractéres!";

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
        .min(11, passwordMatch),
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
        .min(3, areaMatch)
    
});

async function validate(schemaName, body) {
    try {
        switch (schemaName) {
            case "login":
                return await schemaLogin.validate(body);
            case "create-doctor":
                return await schemaCreateDoctor.validate(body);
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
