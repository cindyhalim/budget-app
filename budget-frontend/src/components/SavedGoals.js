import React, { useState, useEffect } from "react";
import axios from "axios";
import SavedGoal from "./SavedGoal";

export default function SavedGoals(props) {
  return (
    <div style={{ WebkitOverflowScrolling: "auto" }}>
      {props.goals.goals.length > 0 &&
        props.goals.goals.map(goal => (
          <SavedGoal
            key={goal.id}
            id={goal.id}
            name={goal.name}
            amount={goal.amount}
            startDate={goal.start_date}
            endDate={goal.end_date}
            onDelete={props.onDelete}
          />
        ))}
    </div>
  );
}
