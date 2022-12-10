import React from "react";
import classes from "../css/styles.module.css";
import AntButton from "../components/UI/AntButton";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <section className={classes["errorpage"]}>
      <AntButton type={"primary"} onClick={() => navigate("/")}>
        &larr; Go Home
      </AntButton>
    </section>
  );
};

export default ErrorPage;
