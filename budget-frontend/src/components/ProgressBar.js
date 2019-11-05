import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";
import { Card } from "@material-ui/core";
import axios from "axios";

const ProgressBar = props => {
  const [total, setTotal] = useState([]);
  const [budget, setBudget] = useState(0);
  const [savingGoal, setSavingGoal] = useState(0);

  useEffect(() => {
    let currentMonth = new Date().toLocaleString("default", { month: "long" });
    axios
      .get(
        `https://blooming-everglades-51994.herokuapp.com/transactions/?month=${currentMonth}&type=progress`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        setTotal(res.data.total);
        setBudget(Number(res.data.budget));
        setSavingGoal(Number(res.data.toSave));
      })
      .catch(e => console.log(e));
  }, [props.goals]);

  const totalSpending = (total / budget) * 100;
  const totalSaving = (savingGoal / budget) * 100;

  return (
    <Card className="progress-card">
      <h3>Daily Progress:</h3>
      <Progress className="daily-progress" multi value={100}>
        <Progress bar color="success" value={totalSpending}>
          {total ? `$${total}` : ""}
        </Progress>
        <Progress bar color="warning" value={totalSaving}>
          {savingGoal ? `$${savingGoal}` : ""}
        </Progress>
        {/* <Progress bar value={100 - (totalSpending + totalSaving)}></Progress> */}
      </Progress>
      <section className="daily-tracker">
        <p>{`Your daily budget is $${budget}`}</p>
        {total + savingGoal > budget ? (
          <p style={{ color: "#e34040" }}>You are currently over your budget</p>
        ) : (
          <p style={{ color: "#6dbd55" }}>You are currently on track!</p>
        )}
      </section>
    </Card>
  );
};

export default ProgressBar;
