import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";
import { Progress } from "reactstrap";
import axios from "axios";

const MonthlyProgressBar = () => {
  const [total, setTotal] = useState([]);
  const [budget, setBudget] = useState(0);

  useEffect(() => {
    let currentMonth = new Date().toLocaleString("default", { month: "long" });
    axios
      .get(
        `https://blooming-everglades-51994.herokuapp.com/transactions/?month=${currentMonth}&type=monthlyprogress`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        setTotal(res.data.total);
        setBudget(res.data.budget);
      });
  }, []);

  const percentMonthlySpending = (total / budget) * 100;

  const checkMonthlySpending = spending => {
    if (spending) {
      if (spending >= 0 && spending < 50) {
        return "success";
      } else if (spending >= 50 && spending < 80) {
        return "warning";
      } else {
        return "danger";
      }
    }
  };

  return (
    <Card className="progress-card">
      <h3 className="monthly-progress-title">Monthly Progress:</h3>
      {total > budget ? (
        <p style={{ color: "#e34040", textAlign: "center" }}>
          You are currently over your budget
        </p>
      ) : (
        <p style={{ color: "#6dbd55", textAlign: "center" }}>
          You are currently on track!
        </p>
      )}
      <Progress className="monthly-progress" value={100}>
        <Progress
          className="monthly-progress"
          bar
          color={checkMonthlySpending(percentMonthlySpending)}
          value={percentMonthlySpending > 100 ? 100 : percentMonthlySpending}
        >
          {total ? `${percentMonthlySpending.toFixed(0)}%` : ""}
        </Progress>
      </Progress>
      <section className="daily-tracker">
        <p>{`Your monthly budget is $${budget}`}</p>
      </section>
    </Card>
  );
};

export default MonthlyProgressBar;
