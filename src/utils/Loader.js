import React from "react";
import loader from "../Assets/loading.png";
import classes from "./Loader.module.css";
import ReactDOM from "react-dom";

const Loader = () => {
  return (
    <>
      <img src={loader} alt="Loading.." id={classes.loading} />,
    </>
  );
};

export default Loader;
