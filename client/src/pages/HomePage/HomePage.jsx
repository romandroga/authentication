import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const HomePage = () => {
  const [userData, setUserData] = useState(null);

  const history = useHistory();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) history.push("/login");

    axios
      .post("http://localhost:3001/registration/confirm", { token })
      .then((res) => {
        setUserData(res.data);
      });
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    history.push("/login");
  };

  return (
    userData && (
      <>
        <h1>Home page</h1>
        <p>Username : {userData.name}</p>
        <p>Email : {userData.email}</p>

        <button onClick={() => handleLogout()}>Logout</button>
      </>
    )
  );
};

export default HomePage;
