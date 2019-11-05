import React from "react";
import Plaid from "../Plaid";

export default function PlaidRegister(props) {
  return (
    <div className="PlaidRegister">
      <h1 className="title">Connect to Your Bank</h1>
      <Plaid />
    </div>
  );
}
