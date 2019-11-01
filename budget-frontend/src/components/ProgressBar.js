import React, { useEffect, useState } from "react";
// import Highcharts from "highcharts";
import axios from "axios";
import LinearProgress from "@material-ui/core/LinearProgress";
import { lighten, makeStyles, withStyles } from "@material-ui/core/styles";

const ProgressBar = () => {
  const [total, setTotal] = useState([]);
  const [budget, setBudget] = useState(0);
  const [month, setMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  useEffect(() => {
    axios
      .get(`http://localhost:3000/transactions/?month=${month}&type=progress`, {
        withCredentials: true
      })
      .then(res => {
        setTotal(res.data.total[0].total);
        setBudget(Number(res.data.budget.amount));
      });
  }, [month]);

  const BorderLinearProgress = withStyles({
    root: {
      height: 30,
      backgroundColor: lighten("#949494", 0.5)
    },
    bar: {
      borderRadius: 20,
      backgroundColor: "#16e050"
    }
  })(LinearProgress);

  return (
    <div>
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={(total / budget) * 100}
      />
    </div>
  );
};

export default ProgressBar;
