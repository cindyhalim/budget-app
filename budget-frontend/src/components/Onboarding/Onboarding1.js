import React from "react";
import "../../styles/Onboarding.sass";

const Onboarding1 = () => {
  return (
    <div>
      <h1 className="title">Welcome to Budgey</h1>
      <img src="pig.png" className="avatar-pig"></img>
      <div className="onboarding1-content">
        <div>
          A budgeting app designed to help you save and visualize your spending.
        </div>
      </div>
    </div>
  );
};

export default Onboarding1;
