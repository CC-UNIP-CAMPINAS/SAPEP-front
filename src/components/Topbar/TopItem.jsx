import React from "react";
import { TopSubItem } from "./TopSubItem";
export function TopItem(props) {
  return (
    <li className="nav-item dropdown no-arrow mx-1">
      <a
        className="nav-link dropdown-toggle"
        href="index.html"
        id={props.id}
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <i className={props.icon}></i>
        {badge(props)}
      </a>
      <TopSubItem id={props.id} isAlert={props.isAlert} subName={props.subName} subObject={props.subObject}></TopSubItem>
    </li>
  );
}

function badge(props) {
  if (props.subObject.length >= 3) {
    return <span className="badge badge-danger badge-counter">{props.subObject.length}</span>;
  } else {
    if (props.subObject.length >= 1) {
      return <span className="badge badge-warning badge-counter">{props.subObject.length}</span>;
    } else {
      return <span className="badge badge-warning badge-counter"></span>;
    }
  }
}
