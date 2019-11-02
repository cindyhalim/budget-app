import React from "react";
import { TextField } from "@material-ui/core";

export default function BudgetRegister(props) {
  return (
    <div className="BudgetRegister">
      <h1 className="title">Budget</h1>
      <p>What is your budget per month?</p>
      <TextField
        className="textinput"
        lable="Amount"
        type="text"
        name="amount"
        onChange={props.onChange}
        required
      />
    </div>
  );
}
