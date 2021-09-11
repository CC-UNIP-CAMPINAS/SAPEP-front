import React from "react";
import { SmallCard } from "./SmallCard";

export function Card(props) {
  return <>{checkCard(props)}</>;
}

function checkCard(props) {
  if (props.type === "small") {
    return <SmallCard category={props.category} size={props.size} quantity={props.quantity} update={props.update} icon={props.icon}></SmallCard>;
  }
}
