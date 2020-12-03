import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import * as styles from "./HomePage.module.css";

const HomePage = () => {
  const [userData, setUserData] = useState(null);

  const history = useHistory();

  const token = JSON.parse(localStorage.getItem("token"));

  useEffect(() => {
    if (!token) history.push("/login");

    axios
      .post("http://localhost:3001/registration/confirm", { token })
      .then((res) => {
        setUserData(res.data[0]);
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    userData && (
      <>
        <div className={styles.wrapper}>
          <h1>Home page</h1>
          <p>
            Username : <span>{userData.realName}</span>{" "}
          </p>
          <p>
            Email : <span>{userData.email}</span>{" "}
          </p>

          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      </>
    )
  );
};

export default HomePage;
