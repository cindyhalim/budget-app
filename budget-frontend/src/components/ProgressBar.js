import React, { useEffect, useState } from "react";
import { Progress } from "reactstrap";
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

  return (
    <div>
      <Progress multi>
        <Progress animated bar color="success" value={(total / budget) * 100}>
          {total}
        </Progress>
        <Progress
          animated
          bar
          color="warning"
          value={(savingGoal / budget) * 100}
        >
          {savingGoal}
        </Progress>
        <Progress animated bar color="danger" value="20">
          UH...OH BRUH
        </Progress>
      </Progress>
    </div>
  );
};

export default ProgressBar;
