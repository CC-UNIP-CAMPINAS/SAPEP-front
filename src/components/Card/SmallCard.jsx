import React from "react";

export function SmallCard(props) {
  return (
    <div class="col-xl-3 col-md-6 mb-4">
      <div class="card h-100">
        <div class="card-body">
          <div class="row align-items-center">
            <div class="col mr-2">
              <div class="text-xs font-weight-bold text-uppercase mb-1">{props.category}</div>
              <div class="h5 mb-0 font-weight-bold text-gray-800">{props.quantity} </div>
              <div class="mt-2 mb-0 text-muted text-xs">
                <span class="text-success mr-2">
                  <i class="fa fa-calendar"></i> {props.update}
                </span>
                <span>•&nbsp; Última atualização</span>
              </div>
            </div>
            <div class="col-auto">
              <i class="fas fa-calendar fa-2x text-primary"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
