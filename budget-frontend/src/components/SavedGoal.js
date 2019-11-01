import React, { useState } from "react";
import { Card, CardContent } from "@material-ui/core";
import GoalForm from "./GoalForm";

export default function SavedGoal(props) {
  const [goalClicked, setGoalClicked] = useState({ status: false });
  const [goalEdit, setGoalEdit] = useState({
    id: props.id,
    amount: props.amount,
    name: props.name,
    start_date: props.startDate,
    end_date: props.endDate
  });

  const editGoal = newState => {
    setGoalEdit(goalEdit => ({
      ...goalEdit,
      ...newState
    }));

    const index = props.findGoalIndexById(props.id, props.newGoal.goals);
    const updatedGoals = [...props.newGoal.goals];
    updatedGoals.splice(index, 1, newState);
    props.setNewGoal({
      ...props.newGoal,
      goals: updatedGoals
    });

    props.editRequest(newState);
  };

  return (
    <div>
      <Card>
        {goalClicked.status !== "edit" && (
          <CardContent>
            <div
              onClick={() => setGoalClicked({ status: !goalClicked.status })}
            >
              <h2>{props.name}</h2>
              <h4>{props.amount}</h4>
            </div>
            <div style={{ display: goalClicked.status ? "block" : "none" }}>
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
              <button onClick={() => setGoalClicked({ status: "edit" })}>
                Edit
              </button>
              <button onClick={() => props.onDelete(goalEdit)}>Delete</button>
            </div>
          </CardContent>
        )}
        <CardContent>
          {goalClicked.status === "edit" && (
            <div>
              <GoalForm
                key={props.id}
                id={props.id}
                active={goalClicked}
                setActive={setGoalClicked}
                name={goalEdit.name}
                amount={goalEdit.amount}
                start_date={goalEdit.start_date}
                end_date={goalEdit.end_date}
                onSave={data => editGoal(data)}
              />
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
