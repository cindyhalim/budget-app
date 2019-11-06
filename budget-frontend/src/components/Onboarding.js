import React from "react";

import SwipeableViews from "react-swipeable-views";
import MobileStepper from "@material-ui/core/MobileStepper";

import Header from "./Header";
import Onboarding1 from "./Onboarding/Onboarding1";
import Onboarding2 from "./Onboarding/Onboarding2";
import Onboarding3 from "./Onboarding/Onboarding3";
import Onboarding4 from "./Onboarding/Onboarding4";

import "../styles/Onboarding.sass";

export default function Onboarding() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNextSwipe = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBackSwipe = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  return (
    <div className="onboarding">
      <Header />
      <div className="swipe-card">
        <SwipeableViews
          onChangeIndex={(index, indexLatest) => {
            index > indexLatest ? handleNextSwipe() : handleBackSwipe();
          }}
        >
          <Onboarding1 />
          <Onboarding2 />
          <Onboarding3 />
          <Onboarding4 />
        </SwipeableViews>
        <MobileStepper
          className="onboarding-stepper"
          variant="dots"
          steps={4}
          position="static"
          activeStep={activeStep}
        />
      </div>
    </div>
  );
}
