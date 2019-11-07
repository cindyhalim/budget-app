import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Piechart from "./Piechart";
import Barchart from "./Barchart";
import Budgetchart from "./Budgetchart.js";
import BudgetComparison from "./BudgetComparison";
import Navbar from "./Navbar";

import AssessmentIcon from "@material-ui/icons/Assessment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";

import "../styles/Analytics.sass";

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
      {chartDropdown[chart]}
      <Navbar location={history.location.pathname.slice(1)} />
    </div>
  );
}
