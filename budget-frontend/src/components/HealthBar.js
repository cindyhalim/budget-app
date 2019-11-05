import React, { useEffect, useState } from "react";
import LinearProgress from "@material-ui/core/LinearProgress";

export default function HealthBar(props) {
  const [completed, setCompleted] = useState();
  useEffect(() => {
    setCompleted(props.hp);
  }, [props.hp]);

  return (
    <div>
      <section className="health">
        <LinearProgress
          value={completed}
          className="health-bar"
          variant="determinate"
          color="secondary"
        />
        <p className="hp">
          {props.hp}
          {""}HP
        </p>
      </section>
      {/* <button
        onClick={() => {
          props.minusHP(20);
        }}
      >
        Subtract Health
      </button>
      <button
        onClick={() => {
          props.resetHP(100);
        }}
      >
        Reset Health
      </button> */}
    </div>
  );
}
