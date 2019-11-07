import React, { useState, useEffect } from "react";
import { Card, CardContent, CardActions } from "@material-ui/core";
import Edit from "@material-ui/icons/Edit";
import Delete from "@material-ui/icons/Delete";
import GoalForm from "./GoalForm";
import moment from "moment";

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
        `https://blooming-everglades-51994.herokuapp.com/goals/${goalEdit.id}`,
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
            <div className="goal-row-one">
              <h2>{props.name}</h2>
              {props.completed ? (
                <p className="goal-target" style={{ color: "#66bb6a" }}>
                  COMPLETED
                </p>
              ) : new Date(props.startDate) > new Date(Date.now()) ? (
                <p className="goal-target" style={{ color: "#4db6ac" }}>
                  UPCOMING
                </p>
              ) : props.dailyTarget > props.budget ? (
                <p className="goal-target" style={{ color: "#dc3545" }}>
                  ATTENTION
                </p>
              ) : props.amountAddedToGoal >= props.dailyTarget ? (
                <p className="goal-amount" style={{ color: "#28a745" }}>
                  +${props.amountAddedToGoal.toFixed(0)}
                </p>
              ) : props.AmountAddedToGoal < props.dailyTarget ? (
                <p className="goal-amount" style={{ color: "#ffc107" }}>
                  +${props.amountAddedToGoal.toFixed(0)}
                </p>
              ) : (
                <p className="goal-amount" style={{ color: "#dc3545" }}>
                  +${props.amountAddedToGoal.toFixed(0)}
                </p>
              )}
            </div>
            <div className="goal-row-two">
              <p>
                {moment(goalEdit.start_date)
                  .startOf("second")
                  .fromNow()}
              </p>
            </div>
          </div>
          <div
            className="goal-extra-info"
            style={{ display: goalClicked.status ? "block" : "none" }}
          >
            {props.dailyTarget > props.budget ? (
              <section style={{ color: "#dc3545", fontSize: "12px" }}>
                Your current saving goal is not feasible with your budget.
              </section>
            ) : (
              ""
            )}
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
            </p>
            <p>Total: ${parseInt(props.amount)}</p>
            <p>Expected: ${props.dailyTarget}/day</p>
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
              button={"SAVE"}
            />
          </div>
        </CardContent>
      )}
    </Card>
  );
}
