import React from "react";
import "../../styles/Onboarding.sass";

const Onboarding1 = () => {
  return (
    <div>
      <h1 className="title">Welcome</h1>
      <img src="pig.png" className="avatar-pig"></img>
      <div className="onboarding1-content">
        <div>
          Monthly budgeting app designed to help you save and track your
          spending. Gain important insight and take control of your money
        </div>
      </div>
    </div>
  );
};

export default Onboarding1;
