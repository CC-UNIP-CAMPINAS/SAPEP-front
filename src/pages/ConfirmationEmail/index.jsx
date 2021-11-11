import { Icon } from "@iconify/react";
import React, { useState } from "react";
import { useParams } from "react-router";
import { api } from "../../services/api";
import "./styles.scoped.scss";

function ConfirmationEmail() {
    const { id } = useParams();

    const inLoading = (
        <>
            <Icon width="200px" icon="eos-icons:loading" color="#158c92" />
            <h1>Confirmando email...</h1>
        </>
    );

    const [status, setStatus] = useState(inLoading);

    React.useEffect(() => {
        const confirm = (
            <>
                <Icon width="150px" icon="el:ok-sign" color="#41e64e" />
                <h1>Email confirmado 😃</h1>
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

        const confirmEmail = async () => {
            try {
                await api.get(`${process.env.REACT_APP_API_HOST}/reset-email/confirm/${id}`);
                setStatus(confirm);
            } catch (error) {
                switch (error.response.status) {
                    case 400:
                        return setStatus(expire);
                    case 404:
                        return setStatus(not_found);
                    case 500:
                        return setStatus(error_comp);
                    default:
                        return;
                }
            }
        };

        setTimeout(confirmEmail, 3000);
    }, [id]);

    return (
        <div className="container">
            <div />
            <section>
                <span>
                    <img src="/logo.svg" alt="logo" />
                </span>
                <main>{status}</main>
            </section>
        </div>
    );
}

export default ConfirmationEmail;
