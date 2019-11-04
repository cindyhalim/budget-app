import React, { useState } from "react";

import Piechart from "./Piechart";
import Barchart from "./Barchart";
import Budgetchart from "./Budgetchart.js";
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

  const chartDropdown = {
    "Current Breakdown": <Piechart />,
    "Monthly Comparison": <Barchart />,
    "Budget Comparison": <Budgetchart />
  };
  return (
    <div>
      <div className="analytics-title">
        {" "}
        <AssessmentIcon className="analytics-icon" />
        <div>Analytics</div>
      </div>
      <div className="analytics-title-category">
        <div>
          <FormControl className="analytics-category">
            <InputLabel id="demo-simple-select-autowidth-label">
              Analytics Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              name=""
              value={chart}
              onChange={e => {
                setChart(e.target.value);
              }}
            >
              <MenuItem value="Current Breakdown" selected={true}>
                Current Breakdown
              </MenuItem>
              <MenuItem value="Monthly Comparison">Monthly Comparison</MenuItem>
              <MenuItem value="Budget Comparison">Budget Comparison</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>
      {chartDropdown[chart]}
      <Navbar />
    </div>
  );
}
