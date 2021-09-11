import React from "react";

export function SmallCard(props) {
  return (
    <div className={defSize(props)}>
      <div className="card h-100">
        <div className="card-body">
          <div className="row align-items-center">
            <div className="col mr-2">
              <div className="text-xs font-weight-bold text-uppercase mb-1">{props.category}</div>
              <div className="h5 mb-0 font-weight-bold text-gray-800">{props.quantity} </div>
              <div className="mt-2 mb-0 text-muted text-xs">
                <span className="text-success mr-2">
                  <i className="fa fa-calendar"></i> {props.update}
                </span>
                <span>•&nbsp; Última atualização</span>
              </div>
            </div>
            <div className="col-auto">{defIcon(props)}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function defSize(props) {
  if (props.size) {
    return props.size + " mb-4";
  } else {
    return "col-xl-3 col-md-6  mb-4";
  }
}

function defIcon(props) {
  if (props.icon) {
    return <i className={props.icon + " fa-2x text-primary"}></i>;
  } else {
    if (props.category.toLowerCase() === "médicos" || props.category.toLowerCase() === "enfermeiros") {
      return <i className="fas fa-briefcase-medical fa-2x text-primary"></i>;
    }
    if (props.category.toLowerCase() === "pacientes") {
      return <i className="fas fa-user-alt fa-2x text-primary"></i>;
    }
    if (props.category.toLowerCase() === "administradores") {
      return <i className="fas fa-book fa-2x text-primary"></i>;
    }
  }
}
