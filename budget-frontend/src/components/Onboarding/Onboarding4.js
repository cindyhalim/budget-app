import React from "react";
import { useHistory } from "react-router-dom";

import "../../styles/Onboarding.sass";

const Onboarding4 = () => {
  const history = useHistory();
  return (
    <div>
      <div>
        <div className="title">Find Badges, Get Coins</div>
        <img src="badges.png" className="badges-final"></img>
        <div className="onboarding4-content">
          Unlock badges by hitting your saving goals
        </div>

        <button
          className="onboarding-button"
          onClick={() => history.push("/home")}
        >
          Happy Savings!
        </button>
      </div>
    </div>
  );
};

export default Onboarding4;
