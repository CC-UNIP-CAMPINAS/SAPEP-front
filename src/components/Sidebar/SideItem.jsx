import React from "react";
import { SideSubItem } from "./SideSubItem";

export function SideItem(props) {
    return (
        <li className="nav-item">
            {createAtag(props)}
            {hasSubItems(props)}
        </li>
    );
}

function createAtag(props) {
    if (props.subValues) {
        console.log("wtfffff");
        return (
            <>
                <a
                    className="nav-link collapsed"
                    href="index.html"
                    data-toggle="collapse"
                    data-target={"#" + props.id}
                    aria-expanded="true"
                    aria-controls={props.id}
                >
                    <i className={props.icons}></i>
                    <span>{props.value}</span>
                </a>
            </>
        );
    } else {
        return (
            <a className="nav-link" href="index.html">
                <i className={props.icons}></i>
                <span>{props.value}</span>
            </a>
        );
    }
}

function hasSubItems(props) {
    if (props.subValues) {
        return <SideSubItem subId={props.id} subName={props.subName} subValues={props.subValues}></SideSubItem>;
    }
}
