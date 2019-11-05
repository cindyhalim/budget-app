import React, { useState } from "react";
import axios from "axios";

import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";
import UserRegister from "./register/UserRegister";
import BudgetRegister from "./register/BudgetRegister";
import PlaidRegister from "./register/PlaidRegister";
import ConfirmRegister from "./register/ConfirmRegister";

import "../styles/Register.sass";

export default function Register(props) {
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [budget, setBudget] = useState(0);
  const [error, setError] = useState("");
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextSwipe = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBackSwipe = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const history = useHistory();

  const handleChange = event => {
    event.persist();
    setNewUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = event => {
    axios
      .post(
        "http://localhost:3000/registrations",
        {
          user: {
            name: newUser.userName,
            email: newUser.email,
            password: newUser.password,
            password_confirmation: newUser.password_confirmation
          }
        },
        { withCredentials: true }
      )
      .then(res => {
        props.handleLogin(res);
        axios
          .post(
            "http://localhost:3000/goals",
            {
              goal: {
                goal_type: "budget",
                amount: parseInt(budget),
                name: "budget",
                start_date: new Date(Date.now()),
                end_date: "null"
              }
            },
            { withCredentials: true }
          )
          .then(res => {
            history.push("/onboarding");
          });
      })
      .catch(err => {
        if (err) {
          if (err.response.status === 422) {
            setError("Please ensure you have filled out all text fields");
          } else if (err.response.status === 500) {
            setError(
              "Sorry, there has been an issue. Please enter a different email and try again"
            );
          }
        }
      });
  };

  return (
    <div className="Register">
      <div className="swipe-card">
        <SwipeableViews
          onChangeIndex={(index, indexLatest) => {
            index > indexLatest ? handleNextSwipe() : handleBackSwipe();
          }}
        >
          <UserRegister onChange={handleChange} />
          <BudgetRegister onChange={event => setBudget(event.target.value)} />
          <PlaidRegister />
          <ConfirmRegister submit={handleSubmit} error={error} />
        </SwipeableViews>
        <MobileStepper
          className="register-stepper"
          variant="dots"
          steps={4}
          position="static"
          activeStep={activeStep}
        />
      </div>
    </div>
  );
}
