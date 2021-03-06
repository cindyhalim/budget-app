import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";

import YearOptions from "./YearOptions";

import "../styles/Piechart.sass";

const Budgetchart = () => {
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
    const monthData = Object.values(compareMonthlyTransactions);

    let negativeData = [];
    let positiveData = [];
    monthData.forEach(data => {
      if (data.budget - data.amount < 0) {
        negativeData.push(data.budget - data.amount);
        positiveData.push(0);
      } else {
        negativeData.push(0);
        positiveData.push(data.budget - data.amount);
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
      yAxis: {
        title: {
          text: "Amount"
        }
      },

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
  }, [compareMonthlyTransactions]);
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
