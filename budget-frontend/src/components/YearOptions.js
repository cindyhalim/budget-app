import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import "../styles/YearOptions.sass";
const years = ["2019"];
const YearOptions = ({ year, setYear }) => {
  const isCurrentYear = new Date().toLocaleString("default", {
    month: "numeric"
  });

  return (
    <div>
      <FormControl className="year-options-list">
        <InputLabel id="demo-simple-select-outlined-label">Year</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={year}
          onChange={e => {
            setYear(e.target.value);
          }}
        >
          {years.map((year, index) => (
            <MenuItem
              key={index}
              value={year}
              selected={year === isCurrentYear}
            >
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default YearOptions;
