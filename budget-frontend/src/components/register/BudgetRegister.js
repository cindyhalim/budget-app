import React from "react";
export default function BudgetRegister(props) {
  return (
    <div>
      <h1>Budget</h1>
      <p>What's your budget per month?</p>
      <input type="text" name="amount" onChange={props.onChange} required />
    </div>
  );
}
