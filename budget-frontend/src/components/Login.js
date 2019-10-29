import React, { useState } from "react";
import axios from "axios";
import { BrowserRouter as Redirect, useHistory } from "react-router-dom";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  const history = useHistory();

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
        if (res.data.logged_in) {
          props.handleLogin(res);
          history.push("/main");
        }
      })
      .catch(err => {
        console.log("login error", err);
      });

    event.preventDefault();
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={event => handleSubmit(event)}>
        Email:
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={event => handleChange(event)}
          required
        />
        Password:
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={event => handleChange(event)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
