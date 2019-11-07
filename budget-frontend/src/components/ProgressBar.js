import React, { useEffect, useState } from "react";
import axios from "axios";

import { Progress } from "reactstrap";
import { Card } from "@material-ui/core";

import SavingLegend from "./SavingLegend";

const ProgressBar = props => {
  const totalSpending = (props.totalTransactions / props.budget) * 100;

  console.log(props.totalTransactions, props.budget, props.totalSaving);
  return (
    <Card className="progress-card">
      <h3>Daily Progress:</h3>
      <SavingLegend />
      <Progress className="daily-progress" multi value={100}>
        <Progress
          bar
          color={
            props.totalTransactions <= props.budget - props.totalSaving
              ? "success"
              : props.totalTransactions > props.budget - props.totalSaving &&
                props.totalTransactions < props.budget
              ? "warning"
              : "danger"
          }
          value={totalSpending}
        >
          {props.totalTransactions ? `$${props.totalTransactions}` : ""}
        </Progress>
      </Progress>
      <section className="daily-tracker">
        <p>{`Your daily budget is $${props.budget}`}</p>
        {props.totalTransactions + props.totalSaving > props.budget ? (
          <p style={{ color: "#e34040" }}>You are currently over your budget</p>
        ) : (
          <p style={{ color: "#6dbd55" }}>You are currently on track!</p>
        )}
      </section>
    </Card>
  );
};

export default ProgressBar;
