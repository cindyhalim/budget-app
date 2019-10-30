import React from "react";
import Navbar from "./Navbar";

export default function NewTransaction() {
  return (
    <div>
      New Transaction
      <input type="number" placeholder="amount"></input>
      <input type="text" placeholder="Location"></input>
      <select>
        <option>Rideshare</option>
        <option>Food</option>
        <option>Clothes</option>
      </select>
      <Navbar></Navbar>
    </div>
  );
}
