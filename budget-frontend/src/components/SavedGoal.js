import React, { useState } from "react";
import { Card, CardContent, CardActions, Button } from "@material-ui/core";
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

    // const index = props.findGoalIndexById(props.id, props.newGoal.goals);
    // const updatedGoals = [...props.newGoal.goals];
    // updatedGoals.splice(index, 1, newState);
    // props.setNewGoal({
    //   ...props.newGoal,
    //   goals: updatedGoals
    // });

    props.editRequest(newState);
  };

  return (
    <Card className="goal-card">
      {goalClicked.status !== "edit" && (
        <CardContent>
          <div
            className="goal-main-info"
            onClick={() => setGoalClicked({ status: !goalClicked.status })}
          >
            <h2>{props.name}</h2>
            <p className="goal-target">
              {props.completed ? "Completed" : `$${props.dailyTarget}/day`}
            </p>
          </div>
          <div
            className="goal-extra-info"
            style={{ display: goalClicked.status ? "block" : "none" }}
          >
            <p>
              {new Date(props.startDate).toLocaleString("default", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}{" "}
              -{" "}
              {new Date(props.endDate).toLocaleString("default", {
                month: "short",
                day: "numeric",
                year: "numeric"
              })}
              <p>Total: ${parseInt(props.amount)}</p>
            </p>
            <CardActions className="card-buttons">
              <Button
                size="small"
                color="#ef5350"
                onClick={() => setGoalClicked({ status: "edit" })}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="primary"
                onClick={() => props.onDelete(goalEdit)}
              >
                Delete
              </Button>
            </CardActions>
          </div>
        </CardContent>
      )}

      {goalClicked.status === "edit" && (
        <CardContent>
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
              refreshGoals={props.refreshGoals}
              setRefreshGoals={props.setRefreshGoals}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
