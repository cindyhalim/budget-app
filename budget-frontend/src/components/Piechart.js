import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import MonthOptions from "./MonthOptions";
import CategoryTransaction from "./CategoryTransaction";
import { useFormControl } from "@material-ui/core/FormControl";

import "../styles/Piechart.sass";

export default function Piechart({ category, setCategory }) {
  const [transactions, setTransactions] = useState([]);
  const [monthTotal, setMonthTotal] = useState(0);
  const [pieMonth, setPieMonth] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );

  useEffect(() => {
    axios
      .get(
        `https://blooming-everglades-51994.herokuapp.com/transactions/?month=${pieMonth}&type=pie`,
        {
          withCredentials: true
        }
      )
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
    if (transactions.length > 0) {
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
                  setCategory(prev =>
                    prev === event.point.name
                      ? "All Transactions"
                      : event.point.name
                  );
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
              '<div style="display:flex; justify-content:space-around; margin-top:-10px; position:relative; width:300px;border-bottom:1px solid #DCDCDC;"><span style="font-weight:normal; vertical-align:super; width:100px">' +
              this.name +
              ' </span> <div style="display:flex; justify-content:space-around; width:200px"><span style="font-weight:normal; vertical-align:super; ">' +
              this.y.toFixed(2) +
              '%</span><span style="font-weight:normal; vertical-align:super; right:0px;">$' +
              this.amount.toFixed(2) +
              "</span></div></div>"
            );
          }
        },
        colors: ["#FAD331", "#64b5f6", "#b39ddb", "#ef6c00"],
        series: [
          {
            name: "Expenses",
            data: transactions
          }
        ]
      });
    }
  }, [transactions]);

  return (
    <div>
      <div className="piechart-month-options">
        <MonthOptions
          month={pieMonth}
          setMonth={setPieMonth}
          setCategory={setCategory}
        />
      </div>
      {transactions.length === 0 && (
        <div className="no-transactions-error">
          You have no transactions for this month
        </div>
      )}
      {transactions.length > 0 && (
        <div>
          <div id="Expenses-graph"></div>
          <CategoryTransaction category={category} pieMonth={pieMonth} />{" "}
        </div>
      )}
    </div>
  );
}
