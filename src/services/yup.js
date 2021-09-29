import * as yup from "yup";
import { notification } from "./toastify";
import types from "./types";

const idEmpty = "O id não pode ser vazio";

const emailMatch = "Digite um email válido";
const emailEmpty = "O email não pode ser vazio";

const nameMatch = "O nome precisa ter no mínimo 3 letras!";
const nameEmpty = "O nome não pode ser vazio";

const lastNameEmpty = "O sobrenome não pode ser vazio";

const phoneEmpty = "O telefone não pode ser vazio";
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

const schemaPassword = yup.object().shape({
    password: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch),
    newPassword: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch)
        .test("passwords-match", "A nova senha é igual a anterior.", function(value) {
            return this.parent.password !== value;
        }),
    reNewPassword: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch)
        .test("passwords-match", "As senhas digitadas estão diferentes!", function(value) {
            return this.parent.newPassword === value;
        }),
});

const schemaComparePassword = yup.object().shape({
    password: yup
        .string()
        .required(passwordEmpty)
        .min(8, passwordMatch),
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

const schemaResetPassword = yup.object().shape({
    email: yup
        .string()
        .email(emailMatch)
        .required(emailEmpty),
});

async function validate(schemaName, body) {
    try {
        switch (schemaName) {
            case "login":
                return await schemaLogin.validate(body);
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
