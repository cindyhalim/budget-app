import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@material-ui/core";

export default function SavedGoal(props) {
  return (
    <div>
      <Card>
        <CardContent>
          <h2>{props.name}</h2>
          <h4>{props.amount}</h4>
          <h4>Start Date</h4>
          <h4>End Date</h4>
        </CardContent>
      </Card>
    </div>
  );
}
