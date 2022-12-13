import React, { useState, useEffect } from "react";
import classes from "../../css/styles.module.css";
import logo from "../../assets/imgs/logo192.png";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import AntButton from "../UI/AntButton";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    //TODO: avaliar possibilidade de migrar metodologia de uso do localStorage para api context!
    const userObj = localStorage.getItem("loggedInUser");
    if (userObj) setIsLoggedIn(true);
  }, []);

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
      <div className={classes["header__user"]}>
        {isLoggedIn && (
          <p>
            <span>
              <UserOutlined />
            </span>
            Joel Alves Pereira
          </p>
        )}
      </div>
      <div className={classes["header__logout"]}>
        {isLoggedIn && <AntButton onClick={handleLogOut}>Sair</AntButton>}
      </div>
    </header>
  );
};

export default Header;
