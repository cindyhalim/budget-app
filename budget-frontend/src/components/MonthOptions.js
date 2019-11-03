import React from "react";

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
      <select
        name=""
        id="select"
        onChange={e => {
          setMonth(e.target.value);
        }}
      >
        {months.map((month, index) => (
          <option key={index} value={month} selected={month === isCurrentMonth}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthOptions;
