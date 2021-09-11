import React from "react";

export function Breadcrumb(props) {
  return (
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">{props.current}</h1>
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <a href="./">{props.father}</a>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          {props.current.toLowerCase()}
        </li>
      </ol>
    </div>
  );
}
