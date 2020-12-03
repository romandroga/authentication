import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import * as styles from "./RegistrationForm.module.css";

const BASE_URL = "https://morning-everglades-17303.herokuapp.com"

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [realName, setRealName] = useState("");
  const [password, setPassword] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [country, setCountry] = useState("Ukraine");
  const [terms, setTerms] = useState(false);
  const [countriesList, setCountriesList] = useState([]);
  const [error, setError] = useState("");

  const history = useHistory();

  useEffect(() => {



    return axios.get(`${BASE_URL}/countries/get`).then((res) => {
      setCountriesList(res.data);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    await axios
      .post(`${BASE_URL}/registration`, {
        email: email,
        login: login,
        realName: realName,
        password: password,
        birthDate: birthDate,
        country: country,
        timestamp: Date.now(),
      })
      .then((res) => {
        if (res.data.message) {
          return setError(res.data.message);
        }

        localStorage.setItem("token", JSON.stringify(res.data));

        return history.push("/home");
      });
  };

  return (
    <form
      className={styles.registrationForm}
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h1>Registration form</h1>
      <p>Please fill in all fields</p>

      <input
        type="email"
        placeholder={"Email..."}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="text"
        placeholder={"Login..."}
        onChange={(e) => setLogin(e.target.value)}
      />

      <input
        type="text"
        placeholder={"Real name..."}
        onChange={(e) => setRealName(e.target.value)}
      />

      <input
        type="password"
        placeholder={"Password..."}
        onChange={(e) => setPassword(e.target.value)}
      />

      <label>birth date</label>
      <input
        type="date"
        placeholder={"Birth date..."}
        onChange={(e) => {
          setBirthDate(e.target.value);
        }}
      />

      <select
        name="country"
        id="country"
        onChange={(e) => {
          console.log(e.target.value);
          setCountry(e.target.value);
        }}
      >
        {countriesList.map((elem) => {
          return (
            <option key={Date.now() * Math.random()} value={elem.countryName}>
              {elem.countryName}
            </option>
          );
        })}
      </select>

      <div className={styles.termsWrapper}>
        <input
          className={styles.checkbox}
          type="checkbox"
          id="terms"
          name="terms"
          onChange={() => setTerms(!terms)}
        />
        <label htmlFor="terms">I am agree with terms and conditions</label>
      </div>

      {error && (
        <div className={styles.errorNotification}>
          <p>{error}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={
          !(email && login && realName && password && birthDate && terms)
        }
      >
        Submit
      </button>
    </form>
  );
};

export default RegistrationForm;
