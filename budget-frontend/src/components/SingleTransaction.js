import React from "react";
import { Card, CardContent } from "@material-ui/core";

const SingleTransaction = ({ amount, location, transactionDate, category }) => {
  return (
    <div>
      <Card>
        <CardContent>
          <h4>{location}</h4>
          <p>${amount}</p>
          <p>{transactionDate}</p>
          <p>{category}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default SingleTransaction;
