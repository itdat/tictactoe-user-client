import React from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Box,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  "@global": {
    "*::-webkit-scrollbar": {
      width: "0.4em",
    },
    "*::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px rgba(0,0,0,0.00)",
    },
    "*::-webkit-scrollbar-thumb": {
      backgroundColor: "rgba(0,0,0,.1)",
    },
  },
  container: {
    position: "fixed",
    width: "100%",
    height: "100vh",
    overflow: "auto",
  },
  content: {
    background: "#ddd",
  },
  toolbarMargin: theme.mixins.toolbar,
}));

const OnlineList = () => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      <Box className={classes.content}>
        <List component="nav">
          {[...Array(20)].map((e, i) => (
            <ListItem button>
              <ListItemAvatar>
                <Avatar src="https://material-ui.com/static/images/avatar/1.jpg" />
              </ListItemAvatar>
              <ListItemText primary={`user ${i + 1}`} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box className={classes.toolbarMargin} />
    </Box>
  );
};

export default OnlineList;
