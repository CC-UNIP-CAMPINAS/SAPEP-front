import React from "react";

export function TopSubitem(props) {
  return (
    <div className="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in" aria-labelledby={props.id}>
      <h6 className="dropdown-header">{props.subName}</h6>
      {isAlert(props)}
      <a className="dropdown-item text-center small text-gray-500" href="index.html">
        Fechar
      </a>
    </div>
  );
}

function isAlert(props) {
  if (props.isAlert) {
    return props.subObject.map((e, index) => (
      <a key={index} className="dropdown-item d-flex align-items-center" href="index.html">
        <div className="mr-3">
          <div className="icon-circle bg-primary">
            <i className={e.icon + " text-white"}></i>
          </div>
        </div>
        <div>
          <div className="small text-gray-500">{e.date}</div>
          <span className="font-weight-bold">{e.value}</span>
        </div>
      </a>
    ));
  } else {
    return props.subObject.map((e, index) => (
      <a key={index} className="dropdown-item d-flex align-items-center" href="index.html">
        <div className="dropdown-list-image mr-3">
          <img className="rounded-circle" src={e.src} alt=""></img>
          <div className="status-indicator bg-success"></div>
        </div>
        <div className="font-weight-bold">
          <div className="text-truncate">{e.value}</div>
          <div className="small text-gray-500">{e.date}</div>
        </div>
      </a>
    ));
  }
}
