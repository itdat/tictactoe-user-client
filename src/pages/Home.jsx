import React, { Fragment, useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";

import ResponsiveDrawer from "../layout/ResponsiveDrawer";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import OnlineList from "../components/OnlineList";
import Maintenance from "../components/Maintenance";

const useStyles = makeStyles((theme) => ({
  content: {
    padding: "2rem",
  },
}));

let socket;

const Home = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState('');
  const ENDPOINT = 'http://localhost:5000/';
  
    useEffect(() => {
      socket = io(ENDPOINT);

      if (location.search !== '') {
        const { name, room } = queryString.parse(location.search);
        
        setRoom(room);
        setName(name)
        
        socket.emit('join', { name, room }, (error) => {
          if(error) {
            alert(error);
          }
        });
      }
    }, [ENDPOINT, location.search]);

    useEffect(() => {
      if (location.search !== '') {
        socket.on("roomData", ({ users }) => {
          setUsers(users);
        });
      }
    }, []);

  const classes = useStyles();
  return (
    <Fragment>
      <ResponsiveDrawer>
        <Grid container>
          <Grid item lg={10} xs={12} className={classes.content}>
            <Maintenance />
          </Grid>
          <Grid item lg={2} xs={12}>
            <OnlineList users={users} />
          </Grid>
        </Grid>
      </ResponsiveDrawer>
    </Fragment>
  );
};

export default Home;
