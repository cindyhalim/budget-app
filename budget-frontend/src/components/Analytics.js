import React, { useState, Suspense, lazy } from "react";
import { useHistory } from "react-router-dom";

import Navbar from "./Navbar";
import Loading from "./Loading";

import AssessmentIcon from "@material-ui/icons/Assessment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import "../styles/Analytics.sass";

const Piechart = lazy(() => import("./Piechart"));
const Barchart = lazy(() => import("./Barchart"));
const Budgetchart = lazy(() => import("./Budgetchart.js"));
const BudgetComparison = lazy(() => import("./BudgetComparison"));

export default function Analytics() {
  const [chart, setChart] = useState("Current Breakdown");
  const history = useHistory();
  const [category, setCategory] = useState("All Transactions");

  const chartDropdown = {
    "Current Breakdown": (
      <Piechart category={category} setCategory={setCategory} />
    ),
    "Monthly Comparison": (
      <Barchart category={category} setCategory={setCategory} />
    ),
    "Savings Comparison": <Budgetchart />,
    "Budget Trends": <BudgetComparison />
  };

  return (
    <div>
      <div className="analytics-title">
        <AssessmentIcon className="analytics-icon" />
        <div>Analytics</div>
      </div>
      <div className="analytics-title-category">
        <div>
          <FormControl className="analytics-category">
            <InputLabel id="demo-simple-select-autowidth-label">
              Type
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              name=""
              value={chart}
              onChange={e => {
                setChart(e.target.value);
              }}
            >
              <MenuItem value="Current Breakdown">Current Breakdown</MenuItem>
              <MenuItem value="Monthly Comparison">Monthly Comparison</MenuItem>
              <MenuItem value="Savings Comparison">Savings Comparison</MenuItem>
              <MenuItem value="Budget Trends">Budget Trends</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      <Suspense fallback={<Loading />}>{chartDropdown[chart]}</Suspense>
      <Navbar location={history.location.pathname.slice(1)} />
    </div>
  );
}
