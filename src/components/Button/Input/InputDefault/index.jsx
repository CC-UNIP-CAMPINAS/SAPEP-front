import React from "react";

import "./styles.scoped.scss";

function InputDefault({ onChange = () => {}, type, value, className, placeholder }) {
    return <input className={className} value={value} type={type} placeholder={placeholder} onChange={onChange} />;
}

export default InputDefault;
