import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import CreateGoal from "./CreateGoal";
import DashboardProfile from "./DashboardProfile";
import SavedGoal from "./SavedGoal";
import HealthBar from "./HealthBar";
import CoinCount from "./CoinCount";
import ProgressBar from "./ProgressBar";

export default function Dashboard(props) {
  console.log("props in dashboard", props);
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
    axios.put(
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
    );
  };

  return (
    <div>
      <h1>Welcome to Dashboard</h1>
      <DashboardProfile
        user={props.logInStatus.user}
        logOutClick={() => props.logOutClick()}
      />
      <HealthBar
        hp={props.logInStatus.user.hp}
        minusHP={props.minusHP}
        resetHP={props.resetHP}
      />
      <CoinCount
        coins={props.logInStatus.user.coins}
        updateCoins={props.updateCoins}
      />
      <ProgressBar />

      <h3>Saving Goals:</h3>
      <CreateGoal
        newGoal={newGoal}
        setNewGoal={setNewGoal}
        refreshGoals={props.refreshGoals}
        setRefreshGoals={props.setRefreshGoals}
      />
      <div style={{ WebkitOverflowScrolling: "auto" }}>
        {newGoal.goals.length > 0 &&
          newGoal.goals.map(goal => (
            <SavedGoal
              newGoal={newGoal}
              setNewGoal={setNewGoal}
              refreshGoals={props.refreshGoals}
              setRefreshGoals={props.setRefreshGoals}
              completed={goal.completed}
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

      <Navbar />
    </div>
  );
}
