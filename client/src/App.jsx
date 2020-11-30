import React, { useEffect, useState } from "react";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import axios from "axios";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from './pages/LoginPage/LoginPage';
import HomePage from './pages/HomePage/HomePage';

axios.defaults.withCredentials = true;

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={HomePage}/>
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage}/>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
