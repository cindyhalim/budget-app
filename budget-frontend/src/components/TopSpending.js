import React, { useEffect, useState } from "react";
import { Card } from "@material-ui/core";
import Axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

export default function TopSpending(props) {
  const [topThree, setTopThree] = useState([]);
  useEffect(() => {
    Axios.get(
      "https://blooming-everglades-51994.herokuapp.com/check_top_three",
      {
        withCredentials: true
      }
    ).then(res => {
      setTopThree([...res.data]);
    });
  }, []);
  return (
    <Card
      className="progress-card"
      style={{ paddingTop: "10px", paddingBottom: "20" }}
    >
      <h3 style={{ marginBottom: "0" }}>Your Top Spending:</h3>
      <Table aria-label="simple table" style={{ height: "100%" }}>
        <TableBody className="spending-body">
          {topThree.length > 0 &&
            topThree.map(row => (
              <TableRow
                className="top-location"
                key={row.location}
                style={{ padding: 0 }}
              >
                <TableCell
                  component="th"
                  scope="row"
                  style={{ padding: 0, margin: 0 }}
                >
                  {row.location}
                </TableCell>
                <TableCell
                  className="top-amount"
                  style={{ padding: 0, margin: 0 }}
                >
                  ${row.total}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </Card>
  );
}
