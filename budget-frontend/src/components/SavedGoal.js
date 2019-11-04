import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import GoalForm from "./GoalForm";

import axios from "axios";

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
  };

  useEffect(() => {
    axios
      .put(
        `http://localhost:3000/goals/${goalEdit.id}`,
        {
          goal: {
            start_date: new Date(goalEdit.start_date),
            end_date: new Date(goalEdit.end_date),
            amount: parseInt(goalEdit.amount),
            name: goalEdit.name
          }
        },
        { withCredentials: true }
      )
      .then(() => {
        props.setRefreshGoals(!props.refreshGoals);
      });
  }, [goalEdit, props.goals]);

  return (
    <Card className="goal-card" style={{ backgroundColor: props.bgColor }}>
      {goalClicked.status !== "edit" && (
        <CardContent>
          <div
            className="goal-main-info"
            onClick={() => setGoalClicked({ status: !goalClicked.status })}
          >
            <h2>{props.name}</h2>
            <p className="goal-target">
              {props.completed ? "COMPLETED" : `$${props.dailyTarget}/day`}
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
              <Edit onClick={() => setGoalClicked({ status: "edit" })} />
              <Delete onClick={() => props.onDelete(goalEdit)} />
            </CardActions>
          </div>
        </CardContent>
      )}

      {goalClicked.status === "edit" && (
        <CardContent>
          <div>
            <GoalForm
              className="saved-goal-form"
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
