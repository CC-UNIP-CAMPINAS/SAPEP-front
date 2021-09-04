import React from "react";
export function input(tipo, ident, placeH) {
  return (
    <div className="form-group">
      <InputComp tipo={tipo} id={ident} placeholder={placeH}></InputComp>
    </div>
  );
}

const InputComp = (props) => {
  return <input type={props.tipo} className="form-control" id={props.id} aria-describedby="emailHelp" placeholder={props.placeholder} />;
};
