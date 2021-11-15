import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import Button from "../../components/Button/Button";
import { api } from "../../services/api";
import "./styles.scoped.scss";
import validate from "../../services/yup";

function ConfirmationPassword() {
    const { id } = useParams();
    const [password, setPassword] = useState("");
    const [rePassword, setRePassword] = useState("");

    const inLoading = (
        <>
            <Icon width="200px" icon="eos-icons:loading" color="#158c92" />
            <h1>Validando url...</h1>
        </>
    );

    const [status, setStatus] = useState(inLoading);

    const confirm = (
        <>
            <Icon width="150px" icon="el:ok-sign" color="#41e64e" />
            <h1>Senha alterada 😃</h1>
        </>
    );
    const not_found = (
        <>
            <Icon width="150px" icon="twemoji:broken-heart" />
            <h1>Link não existe</h1>
        </>
    );

    const expire = (
        <>
            <Icon width="150px" icon="emojione:warning" />
            <h1>Link expirado 🤔</h1>
        </>
    );

    const error_comp = (
        <>
            <Icon width="150px" icon="bx:bxs-error-alt" color="#ff5f5f" />
            <h1>Erro durante a solicitação 😢.</h1>
            <h2>Tente novamente.</h2>
        </>
    );

    React.useEffect(() => {
        const validLink = async () => {
            try {
                await api.get(`${process.env.REACT_APP_API_HOST}/reset-password/is-valid/${id}`);
                setStatus("LIBERATED");
            } catch (error) {
                switch (error.response.status) {
                    case 400:
                        return setStatus("EXPIRED");
                    case 404:
                        return setStatus("NOT_FOUND");
                    case 500:
                        return setStatus("ERROR");
                    default:
                        return;
                }
            }
        };

        setTimeout(validLink, 3000);
    }, [id]);

    const confirmPassword = async () => {
        try {
            if (await validate("reset-password", { password, rePassword })) {
                await api.post(`${process.env.REACT_APP_API_HOST}/reset-password/confirm/${id}`, {
                    newPassword: password,
                });
                setStatus("OK");
            }
        } catch (error) {
            switch (error.response.status) {
                case 400:
                    return setStatus("EXPIRED");
                case 404:
                    return setStatus("NOT_FOUND");
                case 500:
                    return setStatus("ERROR");
                default:
                    return;
            }
        }
    };

    function mountInterface() {
        switch (status) {
            case "OK":
                return confirm;
            case "EXPIRED":
                return expire;
            case "NOT_FOUND":
                return not_found;
            case "ERROR":
                return error_comp;
            case "LIBERATED":
                return (
                    <>
                        <label>Senha</label>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                        />
                        <label>Confirmar senha</label>
                        <input
                            value={rePassword}
                            onChange={(e) => setRePassword(e.target.value)}
                            type="password"
                            placeholder="********"
                        />
                        <Button color="cyan" text="Atualizar senha" handle={() => confirmPassword()} isLoading={true} />
                    </>
                );
            default:
                return inLoading;
        }
    }

    return (
        <div className="container">
            <div />
            <section>
                <span>
                    <img src="/logo.svg" alt="logo" />
                </span>
                <main>{mountInterface()}</main>
            </section>
        </div>
    );
}

export default ConfirmationPassword;
