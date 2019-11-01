import React, { useState, useEffect } from "react";
import axios from "axios";
import Piechart from "./Piechart";
import Barchart from "./Barchart";

import Navbar from "./Navbar";

const chartDropdown = {
  "Current Breakdown": <Piechart />,
  "Monthly Comparison": <Barchart />
};

export default function Analytics() {
  const [chart, setChart] = useState("Current Breakdown");
  return (
    <div>
      <select
        name=""
        id="select"
        onChange={e => {
          setChart(e.target.value);
        }}
      >
        <option value="Current Breakdown">Current Breakdown</option>
        <option value="Monthly Comparison">Monthly Comparison</option>
      </select>
      {chartDropdown[chart]}
      <Navbar></Navbar>
    </div>
  );
}
