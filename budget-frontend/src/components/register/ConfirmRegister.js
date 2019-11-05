import React from "react";

export default function ConfirmRegister(props) {
  return (
    <div className="ConfirmRegister">
      <h1 className="title">Confirm</h1>
      <p>Click Budgey the Pig to submit</p>
      <img src="pig.png" onClick={props.submit}></img>
      {props.error && <p class="error-message">{props.error}</p>}
    </div>
  );
}
