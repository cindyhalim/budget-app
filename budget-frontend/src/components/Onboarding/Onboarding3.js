import React from "react";

import "../../styles/Onboarding.sass";

const Onboarding3 = () => {
  return (
    <div className="onboarding3-entire">
      <img src="credit-card.png" className="transaction-camera"></img>
      <div className="onboarding1-content">
        Budgey grabs all your transactions via credit cards
      </div>
      <img src="camera.png" className="transaction-camera"></img>
      <div className="onboarding1-content">
        Paid with Cash? <br></br>Take a picture of your receipt to instantly add
        to your transactions automagically
      </div>
    </div>
  );
};

export default Onboarding3;
