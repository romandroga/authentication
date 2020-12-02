import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [loginOrEmail, setLoginOrEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/login", { loginOrEmail, password })
      .then((res) => {
        if (res) localStorage.setItem("token", res.data);

        history.push("/home");
      });
  };

  return (
    <form className={styles.loginForm} onSubmit={(e) => handleSubmit(e)}>
      <label>Login or email</label>
      <input
        type="text"
        placeholder={"Login or email"}
        onChange={(e) => setLoginOrEmail(e.target.value)}
      />

      <label>Password</label>
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
