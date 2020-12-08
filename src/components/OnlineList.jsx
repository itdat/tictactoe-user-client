import React from "react";
import UserPlaceholder from "../images/UserPlaceholder2.svg";
import { makeStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@material-ui/core";

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

const OnlineList = ({ users }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        {users && users !== "" ? (
          <List component="nav">
            {users.map(({ name }) => (
              <ListItem button key={name}>
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
  );
};

export default OnlineList;
