import React from "react";
import "../../styles/Onboarding.sass";

const Onboarding1 = () => {
  return (
    <div>
      <h1 className="title">Welcome to Budgey</h1>
      <img src="pig.png" className="avatar-pig"></img>
      <div className="onboarding1-content">
        <div>
          Budgeting app designed to help you save and visualize your spending.
        </div>
        <div>Gain important insight and take control of your money</div>
      </div>
    </div>
  );
};

export default Onboarding1;