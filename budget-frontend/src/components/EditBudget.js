import React, { useState } from "react";
import Axios from "axios";

export default function EditProfile(props) {
  const [updateBudgetInfo, setUpdateBudgetInfo] = useState({
    amount: "",
    goal_type: "budget",
    name: "budget",
    start_date: null,
    end_date: null
  });
  function updateBudget() {
    Axios.post("http://localhost:3000/goals", updateBudgetInfo, {
      withCredentials: true
    });
  }
  return (
    <div>
      <input
        placeholder="Enter a new Budget"
        value={updateBudgetInfo.amount}
        onChange={e =>
          setUpdateBudgetInfo({ ...updateBudgetInfo, amount: e.target.value })
        }
      ></input>
      <button
        onClick={() => {
          updateBudget();
          setUpdateBudgetInfo({ ...updateBudgetInfo, amount: "" });
          props.closeEditBudget();
        }}
      >
        Update Budget
      </button>
    </div>
  );
}
