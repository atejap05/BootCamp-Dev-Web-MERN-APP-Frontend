import React from "react";
import classes from "../../css/styles.module.css";
import logo from "../../assets/imgs/logo192.png";
import { UserOutlined } from "@ant-design/icons";

const Header = () => {
  //TODO: Implementar logica para verificar usuario logado e setar o username na header!!

  return (
    <header className={classes["header"]}>
      <div className={classes["header__logo"]}>
        <img src={logo} alt="logo" />
        <h1>PermutaGov</h1>
      </div>
      <div className={classes["header__user"]}>
        <p>
          <span>
            <UserOutlined />
          </span>
          Joel Alves Pereira
        </p>
      </div>
      <div className={classes["header__contact"]}>
        <p>Contact Us</p>
        <p>About</p>
      </div>
    </header>
  );
};

export default Header;
