import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";

import moment from "moment";
import axios from "axios";

import Navbar from "./Navbar";
import CreateGoal from "./CreateGoal";
import DashboardProfile from "./DashboardProfile";
import SavedGoal from "./SavedGoal";
import ProgressBar from "./ProgressBar";
import TopSpending from "./TopSpending";
import MonthlyProgressBar from "./MonthlyProgressBar";

import "../styles/Dashboard.sass";

export default function Dashboard(props) {
  props.checkLogInStatus();
  const [goals, setGoals] = useState([]);
  const [progressActiveStep, setProgressActiveStep] = useState(1);

  const handleNextSwipe = () => {
    if (progressActiveStep <= 2) {
      setProgressActiveStep(prevActiveStep => prevActiveStep + 1);
    }
  };

  const handleBackSwipe = () => {
    if (progressActiveStep >= 0) {
      setProgressActiveStep(prevActiveStep => prevActiveStep - 1);
    }
  };

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
        setGoals(res.data.goals);
      });
  }, [props.refreshGoals]);

  const deleteGoal = data => {
    axios
      .delete(`http://localhost:3000/goals/${data.id}`, {
        withCredentials: true
      })
      .then(() => {
        const index = findGoalIndexById(goals.id, goals);
        const updatedGoals = [...goals];
        updatedGoals.splice(index, 1);
        setGoals(updatedGoals);
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
      <DashboardProfile
        user={props.logInStatus.user}
        hp={props.logInStatus.user.hp}
        minusHP={props.minusHP}
        resetHP={props.resetHP}
        coins={props.logInStatus.user.coins}
        updateCoins={props.updateCoins}
      />

      <h1 class="date-now">{moment().format("MMMM Do, YYYY")}</h1>
      <SwipeableViews
        index={1}
        onChangeIndex={(index, indexLatest) => {
          index > indexLatest ? handleNextSwipe() : handleBackSwipe();
        }}
      >
        <TopSpending />
        <ProgressBar goals={goals} />
        <MonthlyProgressBar />
      </SwipeableViews>
      <MobileStepper
        className="progress-stepper"
        variant="dots"
        steps={3}
        position="static"
        activeStep={progressActiveStep}
      />
      <section className="goals">
        <h3>Saving Goals:</h3>
        <CreateGoal
          newGoal={goals}
          setNewGoal={setGoals}
          refreshGoals={props.refreshGoals}
          setRefreshGoals={props.setRefreshGoals}
        />
        <div className="goal-card" style={{ WebkitOverflowScrolling: "touch" }}>
          {goals.length > 0 &&
            goals.map(goal => (
              <SavedGoal
                newGoal={goals}
                setNewGoal={setGoals}
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
                completed={goal.completed}
                bgColor={
                  goal.completed
                    ? "#66bb6a"
                    : new Date(goal.start_date) > new Date(Date.now())
                    ? "#d95c52"
                    : "#4db6ac"
                }
              />
            ))}
        </div>
      </section>
      <Navbar />
    </div>
  );
}
