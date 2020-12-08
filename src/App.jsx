import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Grid } from "@material-ui/core";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import Profiles from "./pages/Profiles";
import Rank from "./pages/Rank";
import Online from "./pages/Online";
import Guide from "./pages/Guide";
import ResponsiveDrawer from "./layout/ResponsiveDrawer";
import { makeStyles } from "@material-ui/core/styles";
import OnlineList from "./components/OnlineList";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "2rem",
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Router>
      <Fragment>
        <ResponsiveDrawer>
          <Grid container>
            <Grid item lg={10} xs={12} className={classes.content}>
              <Switch>
                <Route exact path="/" component={Home} />
                {/* Authenticate */}
                <Route exact path="/login" component={Login} />
                <Route exact path="/sign-up" component={SignUp} />
                <Route exact path="/logout" component={Logout} />
                {/*  */}
                <Route path="/profiles" component={Profiles} />
                <Route exact path="/rank" component={Rank} />
                <Route exact path="/online" component={Online} />
                <Route exact path="/guide" component={Guide} />
              </Switch>
            </Grid>
            <Grid item lg={2} xs={12}>
              <OnlineList />
            </Grid>
          </Grid>
        </ResponsiveDrawer>
      </Fragment>
    </Router>
  );
};

export default App;
