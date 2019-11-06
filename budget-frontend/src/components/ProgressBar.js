import React, { useEffect, useState } from "react";
import axios from "axios";

import { Progress } from "reactstrap";
import { Card } from "@material-ui/core";

import SavingLegend from "./SavingLegend";

const ProgressBar = props => {
  const [total, setTotal] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    let currentMonth = new Date().toLocaleString("default", { month: "long" });
    axios
      .get(
        `http://localhost:3000/transactions/?month=${currentMonth}&type=progress`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        setTotal(res.data.total);
        setBudget(Number(res.data.budget));
      });
  }, [props.goals]);

  const totalSpending = (total / budget) * 100;

  const totalSaving = props.goals.reduce((total, goal) => {
    if (new Date(Date.now()) >= new Date(goal.start_date) && !goal.completed) {
      return Number(goal.target_per_day) + total;
    } else {
      return 0 + total;
    }
  }, 0);

  return (
    <Card className="progress-card">
      <h3>Daily Progress:</h3>
      <SavingLegend />
      <Progress className="daily-progress" multi value={100}>
        <Progress bar color="success" value={totalSpending}>
          {total ? `$${total}` : ""}
        </Progress>
        <Progress bar color="warning" value={(totalSaving / budget) * 100}>
          {totalSaving ? `$${totalSaving}` : ""}
        </Progress>
      </Progress>
      <section className="daily-tracker">
        <p>{`Your daily budget is $${budget}`}</p>
        {total + totalSaving > budget ? (
          <p style={{ color: "#e34040" }}>You are currently over your budget</p>
        ) : (
          <p style={{ color: "#6dbd55" }}>You are currently on track!</p>
        )}
      </section>
    </Card>
  );
};

export default ProgressBar;
