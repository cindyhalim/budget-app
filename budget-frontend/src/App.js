import React, { useState, useEffect } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import Highcharts from "highcharts";
import "./App.css";
import axios from "axios";

import { Progress } from "semantic-ui-react";
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function App() {
  const [state, setState] = useState("test");
  const [total, setTotal] = useState(0);
  const [goal, setGoal] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/ping").then(res => {
      let categories = getCategoryTotal(res.data.transactions);
      let totalMonthExpense = getTotal(categories);
      let pieChart = chartDataPoints(categories, totalMonthExpense);
      setState(pieChart);
      setTotal(totalMonthExpense);
      setGoal(parseInt(res.data.goals["0"].amount));
    });
  }, []);

  useEffect(() => {
    Highcharts.chart({
      chart: {
        type: "pie",
        renderTo: "Expenses-graph"
      },
      title: {
        verticalAlign: "middle",
        floating: true,
        text: `Month ${total}`,
        style: {
          fontSize: "15px"
        }
      },
      plotOptions: {
        pie: {
          dataLabels: {
            format: "{point.name}: {point.percentage:.1f} %"
          },
          innerSize: "40%"
        }
      },
      series: [
        {
          name: "Expenses",
          data: state
        }
      ]
    });
  }, [state, total]);

  useEffect(() => {
    let percent = (total / goal) * 100;
    Highcharts.chart({
      title: {
        text: "Highcharts Progress Bar",
        align: "left",
        margin: 0
      },
      chart: {
        renderTo: "progress-bar",
        type: "bar",
        height: 70
      },
      credits: false,
      tooltip: false,
      legend: false,
      navigation: {
        buttonOptions: {
          enabled: false
        }
      },
      xAxis: {
        visible: false
      },
      yAxis: {
        visible: false,
        min: 0,
        max: 100
      },
      series: [
        {
          data: [100],
          grouping: false,
          animation: false,
          enableMouseTracking: false,
          showInLegend: false,
          color: "lightgreen",
          pointWidth: 25,
          borderWidth: 0,
          borderRadiusTopLeft: "4px",
          borderRadiusTopRight: "4px",
          borderRadiusBottomLeft: "4px",
          borderRadiusBottomRight: "4px",
          dataLabels: {
            className: "highlight",
            format: `${total}/${goal}`,
            enabled: true,
            align: "right",
            style: {
              color: "white",
              textOutline: false
            }
          }
        },
        {
          enableMouseTracking: false,
          data: [percent],
          borderRadiusBottomLeft: "4px",
          borderRadiusBottomRight: "4px",
          color: "green",
          borderWidth: 0,
          pointWidth: 25,
          animation: {
            duration: 250
          },
          dataLabels: {
            enabled: true,
            inside: true,
            align: "left",
            format: "{point.y}%",
            style: {
              color: "white",
              textOutline: false
            }
          }
        }
      ]
    });
  });

  function getCategoryTotal(transactions) {
    let categories = {};
    for (let transaction of transactions) {
      if (categories[transaction.category]) {
        categories[transaction.category] += parseInt(transaction.amount);
      } else {
        categories[transaction.category] = parseInt(transaction.amount);
      }
    }
    return categories;
  }

  function getTotal(categories) {
    let total = 0;
    for (let category in categories) {
      total += categories[category];
    }
    return total;
  }
  function chartDataPoints(categories, totalMonthExpense) {
    let result = [];
    for (let category in categories) {
      result.push({
        name: category,
        y: Math.round((categories[category] / totalMonthExpense) * 100)
      });
    }
    return result;
  }

  return (
    <div className="App">
      <div>
        <h1>My Expenses </h1>
        <div id="progress-bar"></div>
        <div id="Expenses-graph"></div>
        {/* <CanvasJSChart options={options} /> */}
      </div>
    </div>
  );
}

export default App;
