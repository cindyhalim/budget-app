import React from "react";

export default function SavingListItem(props) {
  return (
    <li>
      <h2>{props.name}</h2>
      <h3>{props.amount}</h3>
      <p>{props.endDate}</p>
    </li>
  );
}
