import React from "react";

export default function UserRegister(props) {
  return (
    <div>
      <form>
        User Name:
        <input
          type="text"
          name="userName"
          onChange={props.onChange}
          placeholder="Name"
          required
        />
        <br />
        Email:
        <input
          type="email"
          name="email"
          onChange={props.onChange}
          placeholder="Email"
          required
        />
        <br />
        Password:
        <input
          type="password"
          name="password"
          onChange={props.onChange}
          placeholder="Password"
          required
        />
        <br />
        Confirm Password:
        <input
          type="password"
          name="password_confirmation"
          onChange={props.onChange}
          placeholder="Confirm Password"
          required
        />
      </form>
    </div>
  );
}
