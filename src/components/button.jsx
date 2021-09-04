import React from "react";

export function button(id, value, func) {
  return (
    <div className="form-group">
      <CustomButton id={id} value={value} func={func}></CustomButton>
    </div>
  );
}

const CustomButton = (props) => {
  return (
    <a href={props.func} id={props.id} className="btn btn-primary btn-block">
      {props.value}
    </a>
  );
};
