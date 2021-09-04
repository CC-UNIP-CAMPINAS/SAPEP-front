import React from "react";

export function SideSection(props) {
    return (
        <>
            <hr className="sidebar-divider" />
            <div className="sidebar-heading">{props.value}</div>
        </>
    );
}
