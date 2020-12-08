import React from "react";
import { Switch, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = ({ match }) => {
  console.log(match.path);
  return (
    <Switch>
      <Route path={`${match.path}/:id`} component={Profile} />
      <Route exact path={`match.path`} render={() => <h1>Profile</h1>} />
    </Switch>
  );
};

export default Profiles;
