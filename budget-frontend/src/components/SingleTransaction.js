import React from "react";
import { Card, CardContent } from "@material-ui/core";
import moment from "moment";

import "../styles/SingleTransaction.sass";

function categoryColorChecker(specificCategory) {
  if (specificCategory === "Shopping") {
    return "#ef6c00";
  } else if (specificCategory === "Recreation") {
    return "#64b5f6";
  } else if (specificCategory === "Rideshare") {
    return "#b39ddb";
  } else return "#FAD331";
}

const SingleTransaction = ({ amount, location, transactionDate, category }) => {
  return (
    <Card className="transaction" elevation={0}>
      <CardContent className="transaction-card" elevation={2}>
        <div className="single-transac">
          <div className="top-two">
            <div
              className="dot-category"
              style={{ backgroundColor: categoryColorChecker(category) }}
            ></div>
            <div className="name-place">{location}</div>
          </div>

          <div>${Number(amount).toFixed(2)}</div>
        </div>
        <div className="transaction-labels">
          <p>{moment(transactionDate).format("MMM Do YYYY")}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SingleTransaction;
