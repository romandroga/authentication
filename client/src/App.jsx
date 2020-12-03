import React from "react";
import { Route, Switch, BrowserRouter, Redirect } from "react-router-dom";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import HomePage from "./pages/HomePage/HomePage";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/home" component={HomePage} />
        <Route path="/register" component={RegistrationPage} />
        <Route path="/login" component={LoginPage} />
        <Redirect to="/register" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
