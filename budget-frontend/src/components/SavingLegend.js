import React from "react";

import "../styles/SavingLegend.sass";
export default function SavingLegend() {
  return (
    <div className="legend">
      <div className="dot-completed"></div>
      <div className="description">Completed</div>

      <div className="dot-upcoming"></div>
      <div className="description">Upcoming</div>

      <div className="dot-ongoing"></div>
      <div className="description">Ongoing</div>
    </div>
  );
}
