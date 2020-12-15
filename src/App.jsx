import React, { Fragment } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import "./style.css";
import { Grid } from "@material-ui/core";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Profiles from "./pages/Profiles";
import Rank from "./pages/Rank";
import Online from "./pages/Online";
import Guide from "./pages/Guide";
import PlayGame from "./pages/PlayGame";
import Room from "./pages/Room";

import OnlineList from "./components/OnlineList";
import ResponsiveDrawer from "./layout/ResponsiveDrawer";
import { makeStyles } from "@material-ui/core/styles";
import io from "socket.io-client";

let socket;
const ENDPOINT = process.env.REACT_APP_API_URL;

export const ThemeContext = React.createContext("");

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "2rem",
  },
}));

const App = () => {
  const classes = useStyles();

  socket = io(ENDPOINT, {
    transports: ["websocket", "polling", "flashsocket"],
  });

  return (
    <Router>
      <Fragment>
        <ResponsiveDrawer>
          <ThemeContext.Provider value={socket}>
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
                  <Route exact path="/play-game" component={PlayGame} />
                  <Route exact path="/room" component={Room} />
                  <Route exact path="/rank" component={Rank} />
                  <Route exact path="/online" component={Online} />
                  <Route exact path="/guide" component={Guide} />
                </Switch>
              </Grid>
              <Grid item lg={2} xs={12}>
                <OnlineList />
              </Grid>
            </Grid>
          </ThemeContext.Provider>
        </ResponsiveDrawer>
      </Fragment>
    </Router>
  );
};

export default App;
