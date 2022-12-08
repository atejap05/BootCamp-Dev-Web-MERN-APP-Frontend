import React from "react";
import classes from "../../css/styles.module.css";
import { Avatar, Card } from "antd";
const CardHome = ({ icon, title, text }) => (
  <div className={classes["cardhome"]}>
    <div>
      <i>{icon}</i>
      <h1>{title}</h1>
    </div>
    <p>{text}</p>
  </div>
);
export default CardHome;
