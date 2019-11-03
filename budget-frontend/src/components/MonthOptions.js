import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import "../styles/MonthOptions.sass";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

const MonthOptions = ({ month, setMonth }) => {
  const isCurrentMonth = new Date().toLocaleString("default", {
    month: "long"
  });

  return (
    <div>
      <FormControl className="monthly-options-list">
        <InputLabel id="demo-simple-select-outlined-label">Month</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={month}
          onChange={e => {
            setMonth(e.target.value);
          }}
        >
          {months.map((month, index) => (
            <MenuItem
              key={index}
              value={month}
              selected={month === isCurrentMonth}
            >
              {month}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default MonthOptions;
