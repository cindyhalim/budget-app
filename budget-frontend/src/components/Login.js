import React, { useState } from "react";

export default function Login(props) {
  const [user, setUser] = useState({
    email: "",
    password: ""
  });
  return (
    <div>
      <h1>Login</h1>
      Email:
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={user.email}
        onChange={event => setUser({ email: event.target.value })}
        required
      />
      Password:
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={user.password}
        onChange={event => setUser({ password: event.target.value })}
        required
      />
    </div>
  );
}
