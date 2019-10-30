import React, { useState, useEffect } from "react";
import SavedGoal from "./SavedGoal";

export default function SavedGoals(props) {
  return (
    <div style={{ "-webkit-overflow-scrolling": "auto" }}>
      {props.goals.goals.length > 0 &&
        props.goals.goals.map(goal => (
          <SavedGoal name={goal.name} amount={goal.amount} />
        ))}
    </div>
  );
}
