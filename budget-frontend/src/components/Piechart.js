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
            format: "{point.name}: {point.percentage:.1f} %"
          },
          innerSize: "20%"
        }
      },
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
