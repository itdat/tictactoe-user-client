import React, { useState, useEffect } from "react";
import UserPlaceholder from "../images/UserPlaceholder2.svg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  Hidden,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";
import io from "socket.io-client";
import { v4 as uuid } from "uuid";

let socket;

const useStyles = makeStyles((theme) => ({
  container: {
    direction: "rtl",
    position: "fixed",
    width: "100%",
    height: "100vh",
    overflow: "auto",
    background: "#fff",
    borderLeft: "1px solid rgba(0, 0, 0, 0.12)",
  },
  content: {
    direction: "ltr",
  },
  toolbarMargin: theme.mixins.toolbar,
}));

// const loadUsername = () => {
//   try {
//     const serializedState = localStorage.getItem('username');
//     console.log('[ loadUsername ]', serializedState);
//     if (serializedState === null) {
//       return undefined;
//     }
//     return JSON.parse(serializedState);
//   } catch (e) {
//     return undefined;
//   }
// };

const OnlineList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);

  const ENDPOINT = "https://tictactoe-user-api.herokuapp.com/";
  socket = io(ENDPOINT, {
    transports: ["websocket", "polling", "flashsocket"],
  });
  
  useEffect(() => {
    socket.on("roomData", ({ users }) => {
      setUsers(users);
      // console.log('[ roomData ]', users);
    });
  }, []);

  return (
    <Hidden mdDown>
      <Box className={classes.container}>
        <Box className={classes.content}>
          {users.length !== 0 ? (
            <List component="nav">
              {users.map(({ name }) => (
                <ListItem button key={uuid()}>
                  <ListItemAvatar>
                    <Avatar src={UserPlaceholder} />
                  </ListItemAvatar>
                  <ListItemText primary={name} />
                </ListItem>
              ))}
            </List>
          ) : (
            <Box p={2}>
              <Typography>No one is online yet...</Typography>
            </Box>
          )}
        </Box>
        <Box className={classes.toolbarMargin} />
      </Box>
    </Hidden>
  );
};

export default OnlineList;
