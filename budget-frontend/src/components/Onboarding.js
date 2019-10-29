import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Onboarding() {
  const history = useHistory();
  console.log(history);
  return (
    <div>
      Onboarding{" "}
      <button onClick={() => history.push("/dashboard")}>done</button>
    </div>
  );
}
