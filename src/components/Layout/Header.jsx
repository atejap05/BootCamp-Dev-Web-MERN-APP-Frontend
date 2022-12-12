import React from "react";
import classes from "../../css/styles.module.css";
import logo from "../../assets/imgs/logo192.png";
import { useNavigate } from "react-router-dom";



const Header = () => {
  //TODO: Implementar logica para verificar usuario logado e setar o username na header!!

  const navigate = useNavigate();

  function handleLogOut() {
    localStorage.removeItem("loggedInUser");
    navigate("/");
  }

  return (
    <header className={classes["header"]}>
      <div className={classes["header__logo"]}>
        <img src={logo} alt="logo" />
        <h1>PermutaGov</h1>
      </div>
      {/*<div className={classes["header__user"]}>*/}
      {/*  <p>*/}
      {/*    <span>*/}
      {/*      <UserOutlined />*/}
      {/*    </span>*/}
      {/*    Joel Alves Pereira*/}
      {/*  </p>*/}
      {/*</div>*/}
      <div className={classes["header__contact"]}>
        <p onClick={handleLogOut}>Sair</p>
      </div>
    </header>
  );
};

export default Header;
