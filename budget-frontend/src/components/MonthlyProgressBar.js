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
        `http://localhost:3000/transactions/?month=${currentMonth}&type=monthlyprogress`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        setTotal(res.data.total);
        setBudget(res.data.budget);
      });
  }, []);

  return (
    <Card className="progress-card">
      <h3>Monthly Progress:</h3>
      <Progress className="monthly-progress" value={100}>
        <Progress
          className="monthly-progress"
          bar
          color="success"
          value={(total / budget) * 100}
        >
          {(total / budget) * 100}%
        </Progress>
      </Progress>
    </Card>
  );
};

export default MonthlyProgressBar;
