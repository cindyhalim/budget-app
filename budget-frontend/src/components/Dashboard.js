import React, { useState, useEffect } from "react";
import moment from "moment";
import axios from "axios";
import Navbar from "./Navbar";
import CreateGoal from "./CreateGoal";
import DashboardProfile from "./DashboardProfile";
import SavedGoal from "./SavedGoal";
import ProgressBar from "./ProgressBar";
import { Grid } from "@material-ui/core";

import "../styles/Dashboard.sass";
export default function Dashboard(props) {
  props.checkLogInStatus();
  const [newGoal, setNewGoal] = useState({
    createGoal: {
      name: "",
      amount: "",
      start_date: new Date(Date.now()),
      end_date: new Date(new Date(Date.now()).getTime() + 86400000),
      error: ""
    },
    goals: []
  });

  const findGoalIndexById = (id, arr) => {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].id === id) {
        return i;
      }
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/goals", { withCredentials: true })
      .then(res => {
        setNewGoal({ ...newGoal, goals: res.data.goals });
      });
  }, [props.refreshGoals]);

  const deleteGoal = data => {
    axios
      .delete(`http://localhost:3000/goals/${data.id}`, {
        withCredentials: true
      })
      .then(() => {
        const index = findGoalIndexById(newGoal.goals.id, newGoal.goals);
        const updatedGoals = [...newGoal.goals];
        updatedGoals.splice(index, 1);
        setNewGoal({ ...newGoal, goals: updatedGoals });
      });
  };

  const editGoal = data => {
    axios
      .put(
        `http://localhost:3000/goals/${data.id}`,
        {
          goal: {
            start_date: new Date(data.start_date),
            end_date: new Date(data.end_date),
            amount: parseInt(data.amount),
            name: data.name
          }
        },
        { withCredentials: true }
      )
      .then(() => {
        props.setRefreshGoals(!props.refreshGoals);
      });
  };

  return (
    <div className="Dashboard">
      {/* <Grid
        container
        direction="column"
        justify="space-between"
        alignItems="center"
      > */}
      <DashboardProfile
        user={props.logInStatus.user}
        hp={props.logInStatus.user.hp}
        minusHP={props.minusHP}
        resetHP={props.resetHP}
        coins={props.logInStatus.user.coins}
        updateCoins={props.updateCoins}
      />

      <h1 class="date-now">{moment().format("MMMM Do, YYYY")}</h1>
      <ProgressBar />

      <section className="goals">
        <h3>Saving Goals:</h3>
        <CreateGoal
          newGoal={newGoal}
          setNewGoal={setNewGoal}
          refreshGoals={props.refreshGoals}
          setRefreshGoals={props.setRefreshGoals}
        />
        <div style={{ WebkitOverflowScrolling: "touch" }}>
          {newGoal.goals.length > 0 &&
            newGoal.goals.map(goal => (
              <SavedGoal
                newGoal={newGoal}
                setNewGoal={setNewGoal}
                refreshGoals={props.refreshGoals}
                setRefreshGoals={props.setRefreshGoals}
                key={goal.id}
                id={goal.id}
                name={goal.name}
                amount={goal.amount}
                startDate={goal.start_date}
                endDate={goal.end_date}
                onDelete={data => deleteGoal(data)}
                editRequest={data => editGoal(data)}
                findGoalIndexById={findGoalIndexById}
                dailyTarget={goal.target_per_day}
              />
            ))}
        </div>
      </section>
      {/* </Grid> */}
      <Navbar />
    </div>
  );
}
