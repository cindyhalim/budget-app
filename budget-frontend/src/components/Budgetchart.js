import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";

import YearOptions from "./YearOptions";

const Budgetchart = () => {
  const [budgetData, setbudgetData] = useState([]);
  const [compareMonthlyTransactions, setCompareMonthlyTransactions] = useState(
    {}
  );
  const [year, setYear] = useState("2019");
  useEffect(() => {
    axios
      .get(
        `http://localhost:3000/transactions/?month=January&type=budgetchart`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        setCompareMonthlyTransactions(res.data.transactions);
        setbudgetData(res.data.budget);
      });
  }, []);

  useEffect(() => {
    const categories = Object.keys(compareMonthlyTransactions);
    const monthData = Object.values(compareMonthlyTransactions);
    let negativeData = [];
    let positiveData = [];
    monthData.forEach(data => {
      if (budgetData - data < 0) {
        negativeData.push(budgetData - data);
        positiveData.push(0);
      } else {
        negativeData.push(0);
        positiveData.push(budgetData - data);
      }
    });

    Highcharts.chart({
      chart: {
        type: "bar",
        renderTo: "budget-goal"
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

      plotOptions: {
        series: {
          stacking: "normal"
        }
      },

      series: [
        {
          name: "Over Budget",
          data: negativeData,
          color: "#f5424e"
        },
        {
          name: "Under Budget",
          data: positiveData,
          color: "#45d624"
        }
      ]
    });
  }, [compareMonthlyTransactions, budgetData]);
  return (
    <div>
      <div className="piechart-month-options">
        <YearOptions year={year} setYear={setYear} />
      </div>
      <div id="budget-goal"></div>
    </div>
  );
};

export default Budgetchart;
