import React from "react";

import CircularProgress from "@material-ui/core/CircularProgress";

import "../styles/Loading.sass";

export default function Loading() {
  return (
    <div className="loading-suspense">
      <CircularProgress color="secondary" size="150px" />
    </div>
  );
}
