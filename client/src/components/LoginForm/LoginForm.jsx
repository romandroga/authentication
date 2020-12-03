import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as styles from "./LoginForm.module.css";

const BASE_URL = "https://morning-everglades-17303.herokuapp.com"

const LoginForm = () => {
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(`${BASE_URL}/login`, { loginOrEmail, password })
      .then((res) => {
        if (res) {
          localStorage.setItem("token", JSON.stringify(res.data));
        }
        history.push("/home");
      });
  };

  return (
    <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
      <input
        type="text"
        placeholder={"Login or email"}
        onChange={(e) => setLoginOrEmail(e.target.value)}
      />

      <input
        type="Password"
        placeholder={"password"}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
