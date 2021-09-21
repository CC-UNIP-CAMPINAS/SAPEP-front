import React from "react";
export function Input(props) {
  return (
    <div className="form-group">
      <input
        type={props.type}
        onChange={props.onChange}
        value={props.value}
        className="form-control"
        id={props.id}
        aria-describedby="emailHelp"
        placeholder={props.placeholder}
      />
    </div>
  );
}
