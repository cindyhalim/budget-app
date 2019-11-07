import React, { useState, useEffect } from "react";
import axios from "axios";
import Highcharts from "highcharts";

import YearOptions from "./YearOptions";

import "../styles/Piechart.sass";

export default function BudgetComparison() {
  const [compareMonthlyTransactions, setCompareMonthlyTransactions] = useState(
    {}
  );
  const [year, setYear] = useState("2019");

  useEffect(() => {
    axios
      .get(
        `https://blooming-everglades-51994.herokuapp.com/transactions/?month=January&type=budgetchart`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        setCompareMonthlyTransactions(res.data.transactions);
      });
  }, []);

  useEffect(() => {
    const categories = Object.keys(compareMonthlyTransactions);
    const yearData = Object.values(compareMonthlyTransactions);

    const amount = yearData.map(data => data.amount);

    const budget = yearData.map(data => data.budget);

    Highcharts.chart({
      chart: {
        type: "bar",
        renderTo: "budget-trend",
        backgroundColor: "white"
      },
      title: {
        text: ""
      },
      xAxis: [
        {
          categories: categories,
          reversed: true,
          labels: {
            step: 1
          }
        }
      ],
      yAxis: {
        title: {
          text: "Amount"
        }
      },
      series: [
        {
          type: "bar",
          name: "Monthly Spending",
          data: amount,
          color: "#ce93d8"
        },
        {
          type: "spline",
          name: "Monthly Budget",
          data: budget,
          marker: {
            lineWidth: 2,
            fillColor: "gray"
          },
          color: "black"
        }
      ]
    });
  }, [compareMonthlyTransactions]);

  return (
    <div>
      <div className="piechart-month-options">
        <YearOptions year={year} setYear={setYear} />
      </div>
      <div id="budget-trend"></div>
    </div>
  );
}
