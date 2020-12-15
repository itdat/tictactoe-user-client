import React, { useState, useContext, useEffect } from "react";
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
import { v4 as uuid } from "uuid";
import { ThemeContext } from '../App';

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

const OnlineList = () => {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const socket = useContext(ThemeContext)

  useEffect(() => {
    socket.on("getOnlineUsers", ({ users }) => {
      setUsers(users);
    });
  }, [socket])

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
