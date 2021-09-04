import React from "react";

export function SideSection(props) {
  return (
    <>
      <hr class="sidebar-divider" />
      <div class="sidebar-heading">{props.value}</div>
    </>
  );
}
