import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Redirect, useHistory } from "react-router-dom";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });

  const handleChange = event => {
    event.persist();
    setUser(prev => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = event => {
    axios
      .post(
        "http://localhost:3000/sessions",
        {
          user: { email: user.email, password: user.password }
        },
        { withCredentials: true }
      )
      .then(res => {
        return res;
      })
      .catch(err => {
        console.log("login error", err);
      });

    event.preventDefault();
  };
  let history = useHistory();
  const handleClick = () => {
    history.push("/");
  };

  //props.router

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={event => handleSubmit(event)}>
        Email:
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={user.email}
          onChange={event => handleChange(event)}
          required
        />
        Password:
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={user.password}
          onChange={event => handleChange(event)}
          required
        />
        <button type="submit" onClick={handleClick}>
          Login
        </button>
      </form>
    </div>
  );
}
