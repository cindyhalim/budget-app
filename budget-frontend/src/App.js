import React, { useState, useEffect } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import Highcharts from "highcharts";
import "./App.css";
import axios from "axios";

function App() {
  const [state, setState] = useState("test");
  const [total, setTotal] = useState(0);
  const [goal, setGoal] = useState(0);
  const [originalData, setOriginalData] = useState([]);
  const [currentExpenseByCategory, setCurrentBar] = useState({});
  const [selectedMonth, setMonth] = useState("September");
  const [filteredMonth, setFilter] = useState({});

  useEffect(() => {
    axios.get("http://localhost:3000/ping").then(res => {
      setOriginalData(res.data.transactions);
      setGoal(parseInt(res.data.goals["0"].amount));
    });
  }, []);

  useEffect(() => {
    if (originalData.length !== 0) {
      getChartbyMonth(new Date().toLocaleString("default", { month: "long" }));
    }
  }, [originalData]);

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
  }, [total, goal]);

  useEffect(() => {
    let xAxisCategories = [
      selectedMonth,
      new Date().toLocaleString("default", { month: "long" })
    ];
    // console.log(filteredMonth);
    let foodAndDrink = [
      filteredMonth["Food and Drink"],
      currentExpenseByCategory["Food and Drink"]
    ];
    let rideshare = [
      filteredMonth["Rideshare"],
      currentExpenseByCategory["Rideshare"]
    ];
    let shopping = [
      filteredMonth["Shopping"],
      currentExpenseByCategory["Shopping"]
    ];
    let recreation = [
      filteredMonth["Recreation"],
      currentExpenseByCategory["Recreation"]
    ];

    Highcharts.chart({
      chart: {
        type: "column",
        renderTo: "bar-expenses-graph"
      },
      title: {
        text: "This year"
      },
      xAxis: {
        categories: xAxisCategories,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: "Expenses (CAD)"
        }
      },
      tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat:
          '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
          '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
        footerFormat: "</table>",
        shared: true,
        useHTML: true
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: [
        {
          name: "Food and Drink",
          data: foodAndDrink
        },
        {
          name: "Rideshare",
          data: rideshare
        },
        {
          name: "Recreation",
          data: recreation
        },
        {
          name: "Shopping",
          data: shopping
        }
      ]
    });
  }, [currentExpenseByCategory]);

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
  function getChartbyMonth(month) {
    console.log("month:", month);
    console.log("originaldata:", originalData);
    let filteredTransactions = originalData.filter(
      transaction =>
        new Date(transaction.transaction_date).toLocaleString("default", {
          month: "long"
        }) === month
    );

    let categories = getCategoryTotal(filteredTransactions);
    let totalMonthExpense = getTotal(categories);
    let pieChart = chartDataPoints(categories, totalMonthExpense);
    setState(pieChart);
    setTotal(totalMonthExpense);
    setMonth(month);

    setCurrentBar(categories);
    setFilter(getCategoryTotal(filteredTransactions));
    return categories;
  }

  // function getCurrentChartbyMonth(month) {
  //   console.log("month:", month);
  //   console.log("originaldata:", originalData);
  //   let filteredTransactions = originalData.filter(
  //     transaction =>
  //       new Date(transaction.transaction_date).toLocaleString("default", {
  //         month: "long"
  //       }) === month
  //   );

  //   let categories = getCategoryTotal(filteredTransactions);

  //   return categories;
  // }

  return (
    <div className="App">
      <div>
        <h1>My Expenses </h1>
        <div id="progress-bar"></div>
        <select
          name=""
          id="select"
          onChange={e => {
            getChartbyMonth(e.target.value);
          }}
        >
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
        <div id="Expenses-graph"></div>
        <div id="bar-expenses-graph"></div>
      </div>
    </div>
  );
}

export default App;
