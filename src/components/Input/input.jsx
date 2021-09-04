import React from "react";
export function input(type, id, placeholder) {
    return (
        <div className="form-group">
            <InputComp type={type} id={id} placeholder={placeholder}></InputComp>
        </div>
    );
}

const InputComp = (props) => {
    return (
        <input
            type={props.type}
            className="form-control"
            id={props.id}
            aria-describedby="emailHelp"
            placeholder={props.placeholder}
        />
    );
};
