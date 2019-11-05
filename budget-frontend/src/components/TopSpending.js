import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import Axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

export default function TopSpending(props) {
  const [topThree, setTopThree] = useState([]);
  useEffect(() => {
    Axios.get("http://localhost:3000/check_top_three", {
      withCredentials: true
    }).then(res => {
      setTopThree([...res.data]);
    });
  }, []);

  console.log(topThree);
  return (
    <Card
      className="progress-card"
      style={{ paddingTop: "10px", paddingBottom: "20" }}
    >
      <h3 style={{ marginBottom: "0" }}>Your Top Spending:</h3>
      <Table aria-label="simple table" style={{ height: "100%" }}>
        <TableBody>
          {topThree.length > 0 &&
            topThree.map(row => (
              <TableRow key={row.location}>
                <TableCell component="th" scope="row" style={{ padding: "0" }}>
                  {row.location}
                </TableCell>
                <TableCell style={{ padding: "0" }}>
                  {row.total.toFixed(2)}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}
