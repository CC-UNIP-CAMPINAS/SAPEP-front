import React from "react";

export function Breadcrumb(props) {
  return (
    <div className="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 className="h3 mb-0 text-gray-800">{props.current}</h1>
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <a href="./">{props.father}</a>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          {props.current.toLowerCase()}
        </li>
      </ol>
    </div>
  );
}
