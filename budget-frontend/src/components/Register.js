import React, { useState, useEffect } from "react";
import axios from "axios";
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
        const userID = res.data.user[0].id;
        axios
          .post(
            "http://localhost:3000/",
            {
              goal: {
                user_id: userID,
                type: "budget",
                amount: parseInt(budget),
                name: "budget"
              }
            },
            { withCredentials: true }
          )
          .then(res => {
            console.log(res);
          });
      })
      .catch(err => {
        console.log("registration error", err);
      });

    // event.preventDefault();
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
