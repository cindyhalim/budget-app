import React, { useState } from "react";
import axios from "axios";

export default function Register(props) {
  const [newUser, setNewUser] = useState({
    user_name: "",
    email: "",
    password: "",
    password_confirmation: ""
  });

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
            name: newUser.user_name,
            email: newUser.email,
            password: newUser.password,
            password_confirmation: newUser.password_confirmation
          }
        },
        { withCredentials: false }
      )
      .then(res => {
        console.log("registration response", res);
      })
      .catch(err => {
        console.log("registration error", err);
      });

    event.preventDefault();
  };

  return (
    <div>
      <form onSubmit={event => handleSubmit(event)}>
        <input
          type="text"
          name="user_name"
          placeholder="Name"
          value={newUser.user_name}
          onChange={event => handleChange(event)}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={event => handleChange(event)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={event => handleChange(event)}
          required
        />
        <input
          type="password"
          name="password_confirmation"
          placeholder="Confirm Password"
          value={newUser.password_confirmation}
          onChange={event => handleChange(event)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
