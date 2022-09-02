import React from "react";
import classes from "./NavBar.module.css";

const NavBar = (props) => {
  return (
    <header className={classes.navbar}>
      <h1>Demo App</h1>
      {props.isLoggedIn && (
        <button
          onClick={() => {
            props.setIsLoggedIn(false);
          }}
        >
          Log out
        </button>
      )}
    </header>
  );
};

export default NavBar;
