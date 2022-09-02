import React from "react";
import Card from "../utils/Card";
import classes from "./User.module.css";

const User = (props) => {
  return (
    <Card className={classes.container}>
      <div className={classes.name}>
        <img src={props.image} alt="Photo" id={classes.logo} />
        <h2>{props.name}</h2>
      </div>
    </Card>
  );
};

export default User;
