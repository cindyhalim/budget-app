import React, { useState } from "react";
import axios from "axios";
import { Card, CardContent } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
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
        props.setRefreshGoals(!props.refreshGoals);
        setActive(!active);
      })
      .catch(err => console.log("error posting", err));
  };

  return (
    <Card className="new-goal-card">
      <CardContent>
        {!active && (
          <div
            className="new-goal-card-title"
            onClick={() => setActive(!active)}
          >
            <h2>Create Goal</h2>
            <Add />
          </div>
        )}
        {active && (
          <div className="new-goal-form">
            <GoalForm
              active={active}
              setActive={setActive}
              refreshGoals={props.refreshGoals}
              setRefreshGoals={props.setRefreshGoals}
              name={""}
              amount={""}
              start_date={new Date(Date.now())}
              end_date={new Date(new Date(Date.now()).getTime() + 86400000)}
              onSave={onSave}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
