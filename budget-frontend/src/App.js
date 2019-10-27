import React, { useState, useEffect } from "react";
import CanvasJSReact from "./assets/canvasjs.react";
import Highcharts from "highcharts";
import "./App.css";
import axios from "axios";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

function App() {
  const [state, setState] = useState("test");
  const [total, setTotal] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:3000/ping").then(res => {
      let categories = getCategoryTotal(res.data.transactions);
      let totalMonthExpense = getTotal(categories);
      let pieChart = chartDataPoints(categories, totalMonthExpense);
      setState(pieChart);
      setTotal(totalMonthExpense);
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
        text: `This month ${total}`,
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

  // const options = {
  //   // exportEnabled: true,
  //   // animationEnabled: true,
  //   title: {
  //     text: "Where ma money at?"
  //   },
  //   data: [
  //     {
  //       type: "pie",
  //       startAngle: 75,
  //       toolTipContent: "<b>{label}</b>: {y}%",
  //       showInLegend: "true",
  //       legendText: "{label}",
  //       indexLabelFontSize: 16,
  //       indexLabel: "{label} - {y}%",
  //       dataPoints: state
  //     }
  //   ]
  // };

  return (
    <div className="App">
      <div>
        <h1>My Expenses </h1>
        <div id="Expenses-graph"></div>
        {
          /* <CanvasJSChart
          options={options}
          /* onRef={ref => this.chart = ref} */
          // /> */
        }
        {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
      </div>
    </div>
  );
}

export default App;
