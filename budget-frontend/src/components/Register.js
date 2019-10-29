import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import SwipeableViews from "react-swipeable-views";
import UserRegister from "./register/UserRegister";
import BudgetRegister from "./register/BudgetRegister";
import PlaidRegister from "./register/PlaidRegister";
import ConfirmRegister from "./register/ConfirmRegister";

export default function Register(props) {
  const [newUser, setNewUser] = useState({
    userName: "",
    email: "",
    password: "",
    password_confirmation: ""
  });
  const [budget, setBudget] = useState(0);
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
        const userID = res.data.user[0].id;
        axios
          .post(
            "http://localhost:3000/goals",
            {
              goal: {
                user_id: userID,
                goal_type: "budget",
                amount: parseInt(budget),
                name: "budget",
                end_date: "null"
              }
            },
            { withCredentials: true }
          )
          .then(res => {
            history.push("/main");
          });
      })
      .catch(err => {
        console.log("registration error", err);
      });
  };

  return (
    <SwipeableViews>
      <UserRegister onChange={handleChange} />
      <BudgetRegister onChange={event => setBudget(event.target.value)} />
      <PlaidRegister />
      <ConfirmRegister submit={handleSubmit} />
    </SwipeableViews>
  );
}
