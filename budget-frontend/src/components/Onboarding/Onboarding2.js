import React from "react";

import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import LocalTaxiIcon from "@material-ui/icons/LocalTaxi";
import FastfoodIcon from "@material-ui/icons/Fastfood";
import FitnessCenterIcon from "@material-ui/icons/FitnessCenter";

import "../../styles/Onboarding.sass";

const Onboarding2 = () => {
  return (
    <div>
      {" "}
      <img src="budget.png" className="avatar-budget"></img>
      <div className="onboarding1-content">
        You can compare your montlhy spending with other months.
      </div>
      <div className="icons-category">
        <ShoppingBasketIcon className="specific-icon" />
        <LocalTaxiIcon className="specific-icon" />
        <FastfoodIcon className="specific-icon" />
        <FitnessCenterIcon className="specific-icon" />
      </div>
      <div className="onboarding1-content">
        You can see where you spend the money on most.
      </div>
    </div>
  );
};

export default Onboarding2;
