import React from "react";

export function SideSubItem(props) {
  return (
    <div id={props.subId} className="collapse" aria-labelledby={props.subId} data-parent="#accordionSidebar">
      <div className="bg-white py-2 collapse-inner rounded">
        <h6 className="collapse-header">{props.subName}</h6>
        {createSubItens(props)}
      </div>
    </div>
  );
}

function createSubItens(props) {
  if (props.subValues) {
    return props.subValues.map((e) => (
      <a className="collapse-item" href={e + ".html"}>
        {e}
      </a>
    ));
  }
}
