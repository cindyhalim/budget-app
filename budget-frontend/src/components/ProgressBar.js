import React, { useEffect, useState } from "react";

import { Progress } from "reactstrap";
import { Card } from "@material-ui/core";

const ProgressBar = props => {
  const totalSpending = (props.totalTransactions / props.budget) * 100;

  return (
    <Card className="progress-card">
      <h3>Daily Progress:</h3>
      {props.totalTransactions <= props.budget - props.totalSaving ? (
        <p style={{ color: "#6dbd55", fontSize: "16px", textAlign: "center" }}>
          You are currently on track!
        </p>
      ) : props.totalTransactions > props.budget - props.totalSaving &&
        props.totalTransactions < props.budget ? (
        <p style={{ color: "#f8d053", fontSize: "16px", textAlign: "center" }}>
          You are not meeting saving goals!
        </p>
      ) : (
        <p style={{ color: "#f55753", fontSize: "16px", textAlign: "center" }}>
          You are currently over your budget!
        </p>
      )}
      {/* <SavingLegend /> */}
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
      </section>
    </Card>
  );
};

export default ProgressBar;
