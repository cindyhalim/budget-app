import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import MonthOptions from "./MonthOptions";
import CategoryTransaction from "./CategoryTransaction";

export default function Piechart({ setCategory, category }) {
  const [transactions, setTransactions] = useState([]);
  const [monthTotal, setMonthTotal] = useState(0);
  const [pieMonth, setPieMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  useEffect(() => {
    axios
      .get(`http://localhost:3000/transactions/?month=${pieMonth}&type=pie`, {
        withCredentials: true
      })
      .then(res => {
        if (res.data.transactions.length > 0) {
          setTransactions(res.data.transactions);
          setMonthTotal(res.data.total[0].total);
        } else {
          setTransactions([]);
        }
      });
  }, [pieMonth]);

  useEffect(() => {
    Highcharts.chart({
      chart: {
        type: "pie",
        renderTo: "Expenses-graph"
      },
      title: {
        verticalAlign: "middle",
        floating: true,
        text: "",
        style: {
          fontSize: "15px"
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          point: {
            events: {
              click: function(event) {
                setCategory(event.point.name);
              }
            }
          },
          dataLabels: {
            enabled: false
          },
          innerSize: "20%",
          showInLegend: true
        }
      },
      legend: {
        enabled: true,
        floating: false,
        borderWidth: 0,
        align: "center", // Moving the legend to the right of the donut chart
        layout: "vertical", // Display in columns
        verticalAlign: "bottom",
        itemMarginTop: 2, // Space between each category in the legend
        itemMarginBottom: 2,
        itemStyle: {
          lineHeight: "35px" // Aligning icons and text
        },
        useHTML: true,
        labelFormatter: function() {
          // Includes cat & price in legend
          return (
            '<span style="display:block; margin-top:-10px; position:relative; width:210px;border-bottom:1px solid #DCDCDC;">&nbsp<span style="font-weight:normal; vertical-align:super;">' +
            this.name +
            ' </span><span style="font-weight:normal; vertical-align:super; position:absolute; right:0px;">$' +
            this.y +
            "<br/></span></span>"
          );
        }
      },
      colors: ["#FAD331", "#96D5DF", "#1BA8BB", "#C5D930"],
      series: [
        {
          name: "Expenses",
          data: transactions
        }
      ]
    });
  }, [transactions]);

  return (
    <div>
      <MonthOptions month={pieMonth} setMonth={setPieMonth} />
      {transactions.length === 0 && <div> No Data</div>}
      <div id="Expenses-graph"></div>
      <CategoryTransaction category={category} pieMonth={pieMonth} />
    </div>
  );
}
