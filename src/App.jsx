import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home";
// import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import {Join} from './components'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Join} />
        <Route exact path="/sign-up" component={SignUp} />
      </Switch>
    </Router>
  );
};

export default App;
