import React from "react";
import Card from "../utils/Card";
import useInput from "../hooks/use-input";
import classes from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const checkValidity = (value) => {
  if (value.trim().length > 0) return true;
  return false;
};

const userValidation = (username, password) => {
  if (username.trim() === "foo" && password === "bar") return true;
  return false;
};

const LoginPage = (props) => {
  const navigate = useNavigate();
  const [ErrorwrongDetails, ErrorwrongDetailsHandler] = useState(false);
  const {
    InputValue: usernameValue,
    showError: usernameShowError,
    onBlur: usernameOnBlur,
    onChangeValue: usernameOnChangeValue,
    isValid: usernameValid,
    onSubmit: usernameSubmit,
    reset: usernamereset,
  } = useInput(checkValidity);
  const {
    InputValue: passwordValue,
    showError: passwordShowError,
    onBlur: passwordOnBlur,
    onChangeValue: passwordOnChangeValue,
    isValid: passwordValid,
    onSubmit: passwordSubmit,
    reset: passwordreset,
  } = useInput(checkValidity);

  const formisValid = passwordValue.length > 0 && usernameValue.length > 0;

  const SubmitHandler = (e) => {
    e.preventDefault();
    if (!formisValid) {
      passwordSubmit();
      usernameSubmit();
      return;
    }
    if (userValidation(usernameValue, passwordValue)) {
      props.setIsLoggedIn(true);
      navigate("home");
    } else {
      ErrorwrongDetailsHandler(true);
    }
    // passwordreset();
    // usernamereset()
  };

  return (
    <Card className={classes.container}>
      <form className={classes.loginForm} onSubmit={SubmitHandler}>
        <h2>Login</h2>
        <label htmlFor={classes.username} className={classes.name}>
          User Name
        </label>
        <input
          type="text"
          name="UserName"
          value={usernameValue}
          id={classes.username}
          onBlur={usernameOnBlur}
          onChange={usernameOnChangeValue}
        />
        {usernameShowError && <p>Enter a valid Username!!</p>}
        <label htmlFor={classes.password} className={classes.name}>
          Password
        </label>
        <input
          type="password"
          name="password"
          id={classes.password}
          value={passwordValue}
          onBlur={passwordOnBlur}
          onChange={passwordOnChangeValue}
        />
        {passwordShowError && <p>Enter a valid Password!!</p>}
        {ErrorwrongDetails && <p>Wrong UserName or Password!!</p>}
        <input type="submit" value="Login" id={classes.submit} />
      </form>
    </Card>
  );
};

export default LoginPage;
