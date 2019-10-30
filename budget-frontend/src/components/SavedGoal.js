import React, { useState } from "react";
import { Card, CardContent } from "@material-ui/core";

export default function SavedGoal(props) {
  const [goalClicked, setGoalClicked] = useState(false);

  return (
    <div onClick={() => setGoalClicked(!goalClicked)}>
      <Card>
        <CardContent>
          <h2>{props.name}</h2>
          <h4>{props.amount}</h4>
          <div style={{ display: goalClicked ? "block" : "none" }}>
            <h4>
              Start date:{" "}
              {new Date(props.startDate).toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </h4>
            <h4>
              End date:{" "}
              {new Date(props.endDate).toLocaleString("default", {
                month: "long",
                day: "numeric",
                year: "numeric"
              })}
            </h4>
            <button>Edit</button>
            <button onClick={() => props.onDelete()}>Delete</button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
