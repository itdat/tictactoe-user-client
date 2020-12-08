import React, { Fragment, useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Grid } from "@material-ui/core";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Logout from "./pages/Logout";
import Profiles from "./pages/Profiles";
import Rank from "./pages/Rank";
import Online from "./pages/Online";
import Guide from "./pages/Guide";
import ResponsiveDrawer from "./layout/ResponsiveDrawer";
import { makeStyles } from "@material-ui/core/styles";
import OnlineList from "./components/OnlineList";
import { Join } from "./components";

import queryString from "query-string";
import io from "socket.io-client";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "2rem",
  },
}));

let socket;

const App = (props) => {
  console.log(props.location);
  const classes = useStyles();

  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const ENDPOINT = "http://localhost:5000/";

  useEffect(() => {
    socket = io(ENDPOINT);
    // console.log(location);
    // if (location.search !== "") {
    //   const { name, room } = queryString.parse(location.search);

    //   setRoom(room);
    //   setName(name);

    //   socket.emit("join", { name, room }, (error) => {
    //     if (error) {
    //       alert(error);
    //     }
    //   });
    // }
  }, [ENDPOINT]);

  // useEffect(() => {
  //   if (location.search !== "") {
  //     socket.on("roomData", ({ users }) => {
  //       setUsers(users);
  //     });
  //   }
  // }, []);

  return (
    <Router>
      <Fragment>
        <ResponsiveDrawer>
          <Grid container>
            <Grid item lg={10} xs={12} className={classes.content}>
              <Switch>
                <Route exact path="/" component={Home} />
                {/* Authenticate */}
                <Route exact path="/login" component={Join} />
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
