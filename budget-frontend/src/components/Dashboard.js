import React, { useState, useEffect } from "react";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import { Card } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import moment from "moment";
import axios from "axios";

import Navbar from "./Navbar";
import CreateGoal from "./CreateGoal";
import DashboardProfile from "./DashboardProfile";
import SavedGoal from "./SavedGoal";
import ProgressBar from "./ProgressBar";
import TopSpending from "./TopSpending";
import MonthlyProgressBar from "./MonthlyProgressBar";
import GoalForm from "./GoalForm";

import "../styles/Dashboard.sass";
import "../styles/DashboardProfile.sass";

export default function Dashboard(props) {
  if (!props.logInStatus.user) {
    props.checkLogInStatus();
  }
  const [totalTransactions, setTotalTransactions] = useState([]);
  const [budget, setBudget] = useState(0);
  const history = useHistory();
  const [goals, setGoals] = useState([]);
  const [progressActiveStep, setProgressActiveStep] = useState(1);
  const [active, setActive] = useState(false);

  const totalSaving = goals.reduce((total, goal) => {
    if (
      new Date(Date.now()) >= new Date(goal.start_date) &&
      !goal.completed &&
      goal.target_per_day < budget
    ) {
      return Number(goal.target_per_day) + total;
    } else {
      return 0 + total;
    }
  }, 0);
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
    let currentMonth = new Date().toLocaleString("default", { month: "long" });
    axios
      .get(
        `https://blooming-everglades-51994.herokuapp.com/transactions/?month=${currentMonth}&type=progress`,
        {
          withCredentials: true
        }
      )
      .then(res => {
        setTotalTransactions(res.data.total);
        setBudget(Number(res.data.budget));
      });
  }, [props.goals]);

  useEffect(() => {
    axios
      .get("https://blooming-everglades-51994.herokuapp.com/goals", {
        withCredentials: true
      })
      .then(res => {
        setGoals(res.data.goals);
      });
  }, [props.refreshGoals]);

  const deleteGoal = data => {
    axios
      .delete(
        `https://blooming-everglades-51994.herokuapp.com/goals/${data.id}`,
        {
          withCredentials: true
        }
      )
      .then(() => {
        const index = findGoalIndexById(data.id, goals);
        const updatedGoals = [...goals];
        updatedGoals.splice(index, 1);
        setGoals(updatedGoals);
      });
  };
  const onSave = newState => {
    axios
      .post(
        "https://blooming-everglades-51994.herokuapp.com/goals",
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
    <div className="Dashboard">
      <DashboardProfile
        user={props.logInStatus.user}
        minusHP={props.minusHP}
        resetHP={props.resetHP}
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
        <ProgressBar
          goals={goals}
          budget={budget}
          totalTransactions={totalTransactions}
          totalSaving={totalSaving}
        />
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
        <div className="saving-goals-title">
          <h3>Saving Goals:</h3>
          <CreateGoal
            active={active}
            setActive={setActive}
            newGoal={goals}
            setNewGoal={setGoals}
            refreshGoals={props.refreshGoals}
            setRefreshGoals={props.setRefreshGoals}
          />
        </div>

        {active && (
          <div className="new-goal-form">
            <Card style={{ backgroundColor: "#3949ab" }}>
              <GoalForm
                style={{ color: "white" }}
                active={active}
                setActive={setActive}
                refreshGoals={props.refreshGoals}
                setRefreshGoals={props.setRefreshGoals}
                name={""}
                amount={""}
                start_date={new Date(Date.now())}
                end_date={new Date(new Date(Date.now()).getTime() + 86400000)}
                onSave={onSave}
                button={"CREATE"}
              />
            </Card>
          </div>
        )}
        <div className="goal-card" style={{ WebkitOverflowScrolling: "touch" }}>
          {goals.length > 0 &&
            goals.map(goal => (
              <SavedGoal
                key={goal.id}
                id={goal.id}
                name={goal.name}
                amount={goal.amount}
                startDate={goal.start_date}
                endDate={goal.end_date}
                onDelete={data => deleteGoal(data)}
                newGoal={goals}
                setNewGoal={setGoals}
                refreshGoals={props.refreshGoals}
                setRefreshGoals={props.setRefreshGoals}
                findGoalIndexById={findGoalIndexById}
                dailyTarget={goal.target_per_day}
                budget={budget}
                amountAddedToGoal={
                  (goal.target_per_day / totalSaving) *
                  (budget - totalTransactions >= 0
                    ? budget - totalTransactions
                    : 0)
                }
                completed={goal.completed}
              />
            ))}
        </div>
      </section>
      <Navbar location={history.location.pathname.slice(1)} />
    </div>
  );
}
