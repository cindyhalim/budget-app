import React from "react";
import { useHistory } from "react-router-dom";

export default function Onboarding() {
  const history = useHistory();
  return (
    <div>
      Onboarding <button onClick={() => history.push("/home")}>done</button>
    </div>
  );
}
