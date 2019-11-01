import React, { useEffect, useState } from "react";
import axios from "axios";
import Highcharts from "highcharts";
import MonthOptions from "./MonthOptions";

export default function Piechart() {
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
        setTransactions(res.data.transactions);
        setMonthTotal(res.data.total[0].total);
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
          dataLabels: {
            format: "{point.name}: {point.percentage:.1f} %"
          },
          innerSize: "20%"
        }
      },
      series: [
        {
          name: "Expenses",
          data: transactions ? transactions : []
        }
      ]
    });
  }, [transactions]);

  return (
    <div>
      <MonthOptions month={pieMonth} setMonth={setPieMonth} />
      <div id="Expenses-graph"> PIE CHART</div>
    </div>
  );
}
