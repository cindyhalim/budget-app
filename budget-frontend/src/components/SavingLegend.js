import React from "react";

import "../styles/SavingLegend.sass";
export default function SavingLegend() {
  return (
    <div className="legend">
      <div className="dot-completed"></div>
      <div className="description">Transactions</div>

      <div className="dot-upcoming"></div>
      <div className="description">Saving Goal</div>
    </div>
  );
}
