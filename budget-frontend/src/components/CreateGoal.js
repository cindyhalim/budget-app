import React from "react";
import { Button } from "@material-ui/core";
import Add from "@material-ui/icons/Add";
import Remove from "@material-ui/icons/Remove";

export default function CreateGoal(props) {
  return (
    <div>
      <Button
        className="new-goal-card"
        onClick={() => props.setActive(!props.active)}
      >
        {!props.active && <Add />}
        {props.active && <Remove />}
      </Button>
    </div>
  );
}
