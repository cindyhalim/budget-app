import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";
import { Card, CardContent } from "@material-ui/core";
import axios from "axios";

const ProgressBar = () => {
  const [total, setTotal] = useState([]);
  const [budget, setBudget] = useState(0);
  const [savingGoal, setSavingGoal] = useState(0);

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
        setSavingGoal(Number(res.data.toSave));
      });
  }, []);

  const totalSpending = (total / budget) * 100;
  const totalSaving = (savingGoal / budget) * 100;

  return (
    <Card className="progress-card">
      <h3>Daily Progress:</h3>
      <Progress className="daily-progress" multi>
        <Progress animated bar color="success" value={totalSpending}>
          {total}
        </Progress>
        <Progress animated bar color="warning" value={totalSaving}>
          {savingGoal}
        </Progress>
        <Progress
          animated
          bar
          color="danger"
          value={100 - (totalSpending + totalSaving)}
        >
          UH...OH BRUH
        </Progress>
      </Progress>
    </Card>
  );
};

export default ProgressBar;
