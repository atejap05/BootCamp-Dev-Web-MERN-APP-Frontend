import React from "react";
import classes from "../../css/styles.module.css";
import logo from "../../assets/imgs/logo192.png";

const Header = () => {
  return (
    <header className={classes["header"]}>
      <div>
        <img src={logo} alt="logo" />
        <h1>PermutaGov</h1>
      </div>
      <div>
        <p>Contact Us</p>
        <p>About</p>
      </div>
    </header>
  );
};

export default Header;
