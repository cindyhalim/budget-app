import React from "react";
import { Card, CardContent } from "@material-ui/core";
import moment from "moment";

import "../styles/SingleTransaction.sass";

const SingleTransaction = ({ amount, location, transactionDate }) => {
  return (
    <Card className="transaction" elevation={0}>
      <CardContent className="transaction-card" elevation={2}>
        <h4>{location}</h4>
        <div className="transaction-details">
          <div className="transaction-labels">
            <p>Amount:</p>
            <p>Date:</p>
          </div>
          <div className="transaction-content">
            <p>${Number(amount).toFixed(2)}</p>
            <p>{moment(transactionDate).format("MMMM Do YYYY, h:mm:ss a")}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleTransaction;
