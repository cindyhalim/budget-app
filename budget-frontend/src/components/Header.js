import React from "react";
import "../styles/Header.sass";
const Header = () => {
  return (
    <div className="header-contents">
      <img src="pig.png" className="avatar-piggy"></img>
      <span className="header-title">Budgey</span>
    </div>
  );
};

export default Header;
