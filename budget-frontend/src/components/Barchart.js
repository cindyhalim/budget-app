import React, { useEffect, useState } from "react";
import Highcharts from "highcharts";
import MonthOptions from "./MonthOptions";
import axios from "axios";

export default function Barchart() {
  const [bar1Month, setBar1Month] = useState(
    new Date().toLocaleString("default", { month: "long" })
  );
  const [bar2Month, setBar2Month] = useState("");

  const [transactions1, setTransactions1] = useState([]);
  const [transactions2, setTransactions2] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/transactions/?month=${bar1Month}&type=bar`, {
        withCredentials: true
      })
      .then(res => setTransactions1(res.data.transactions));
  }, [bar1Month]);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/transactions/?month=${bar2Month}&type=bar`, {
        withCredentials: true
      })
      .then(res => setTransactions2(res.data.transactions));
  }, [bar2Month]);

  useEffect(() => {
    Highcharts.chart({
      chart: {
        type: "column",
        renderTo: "bar-expenses-graph"
      },
      title: {
        text: "This year"
      },
      xAxis: {
        categories: bar2Month ? [bar1Month, bar2Month] : [bar1Month],
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

      series: getChartdata()
    });
  }, [transactions1, transactions2, bar1Month, bar2Month]);

  function getChartdata() {
    return [
      {
        name: "Food and Drink",
        data: ifTwoCharts(0)
      },
      {
        name: "Recreation",
        data: ifTwoCharts(1)
      },
      {
        name: "Rideshare",
        data: ifTwoCharts(2)
      },
      {
        name: "Shopping",
        data: ifTwoCharts(3)
      }
    ];
  }

  function ifTwoCharts(index) {
    if (bar2Month) {
      return [
        transactions1.length > 0 ? transactions1[index].amount : [],
        transactions2.length > 0 ? transactions2[index].amount : []
      ];
    } else {
      if (transactions1.length > 0) {
        return [transactions1[index].amount];
      } else {
        return [];
      }
    }
  }

  return (
    <div>
      <MonthOptions month={bar1Month} setMonth={setBar1Month} />
      <MonthOptions month={bar2Month} setMonth={setBar2Month} />
      <div id="bar-expenses-graph">BAR CHART</div>
    </div>
  );
}
