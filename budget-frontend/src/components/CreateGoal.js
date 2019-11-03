import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import GoalForm from "./GoalForm";

export default function CreateGoal(props) {
  const [active, setActive] = useState(false);

  const onSave = newState => {
    axios
      .post(
        "http://localhost:3000/goals",
        {
          goal: {
            goal_type: "saving",
            amount: parseInt(newState.amount),
            name: newState.name,
            start_date: newState.start_date,
            end_date: newState.end_date
          }
        },
        { withCredentials: true }
      )
      .then(() => {
        setActive(!active);
      });
  };

  return (
    <Card className="new-goal-card">
      <CardContent>
        {!active && (
          <div onClick={() => setActive(!active)}>
            <h2>Create Goal</h2>
          </div>
        )}
        {active && (
          <div>
            <GoalForm
              active={active}
              setActive={setActive}
              refreshGoals={props.refreshGoals}
              setRefreshGoals={props.setRefreshGoals}
              name={props.newGoal.createGoal.name}
              amount={props.newGoal.createGoal.amount}
              start_date={props.newGoal.createGoal.start_date}
              end_date={props.newGoal.createGoal.end_date}
              onSave={onSave}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
