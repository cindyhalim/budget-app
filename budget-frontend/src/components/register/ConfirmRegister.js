import React from "react";

export default function ConfirmRegister(props) {
  return (
    <div>
      <h1>Confirm</h1>
      <button type="submit" onClick={props.submit}>
        Submit
      </button>
    </div>
  );
}
