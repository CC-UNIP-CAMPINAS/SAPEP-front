import React from "react";
import { Icon } from "@iconify/react";
import "./styles.scoped.scss";

function Button({ id, handle, text, disabled, isLoading, color, styles }) {
    const _isMounted = React.useRef(true);
    const [loading, setLoading] = React.useState(false);
    const [isDisabled, setDisabled] = React.useState(disabled);

    React.useEffect(() => {
        return () => {
            _isMounted.current = false;
        };
    }, []);

    React.useEffect(() => {
        setDisabled(disabled);
    }, [disabled]);

    async function handleClick() {
        if (isLoading) {
            setLoading(true);
            setDisabled(true);
        }

        try {
            const result = await handle();
            if (_isMounted.current) {
                if (isLoading) {
                    setLoading(false);
                    setDisabled(false);
                }

                if (result?.callbackEffect) result.callbackEffect(); //NOTE Funções que vão realizar um efeito colateral (desmontar um componente por exemplo)
            }
        } catch (error) {
            throw error;
        }
    }

    return (
        <button id={id} className={color} styles={styles} type="button" onClick={handleClick} disabled={isDisabled}>
            {loading ? <Icon icon="eos-icons:loading" /> : text}
        </button>
    );
}

export default Button;
