import React, { useState } from "react";
import Piechart from "./Piechart";
import Barchart from "./Barchart";
import MonthlyProgressBar from "./MonthlyProgressBar";
import Navbar from "./Navbar";

export default function Analytics() {
  const [chart, setChart] = useState("Current Breakdown");
  const [category, setCategory] = useState("");

  const chartDropdown = {
    "Current Breakdown": (
      <Piechart setCategory={setCategory} category={category} />
    ),
    "Monthly Comparison": <Barchart />
  };
  return (
    <div>
      <MonthlyProgressBar />
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
