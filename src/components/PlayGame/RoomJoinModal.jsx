import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import VideogameAsset from "@material-ui/icons/VideogameAsset";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
} from "@material-ui/core";

import "./css/styles.css";
import AuthContext from "../../context/auth/authContext";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    backgroundColor: "#004c9e",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
  },
  inputField: {
    marginTop: theme.spacing(3),
  },
  submit: {
    marginTop: theme.spacing(3),
    background: "#004c9e",
    color: "#fff",
    "&:hover": {
      background: "#004c9edd",
    },
  },
}));

const RoomJoinModal = ({ close, onClick }) => {
  const { user } = useContext(AuthContext);
  const [name] = useState(user?.username ?? '');

  const classes = useStyles();

  const [formData, setFormData] = useState();

  const handleInputChange = (e) => {
    if (e.target.name === 'level') {
      setFormData({ ...formData, [e.target.name]: parseInt(e.target.value) });
      return;
    }
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return <div className="tictactoe-modal">
    <a href="#/" className="close" onClick={close}>
      &times;
    </a>
    <div className="content">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <VideogameAsset />
        </Avatar>
        <Typography component="h1" variant="h5" className={classes.inputField}>
          Join Room
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            className={classes.inputField}
            required
            fullWidth
            id="room"
            label="CODE"
            onChange={handleInputChange}
            name="room"
            autoComplete="room"
            autoFocus
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              
              const { room } = formData;
              onClick(name, room);
              close();
            }}
          >
            Join
          </Button>
        </form>
      </div>
    </div>
  </div>;
}

export default RoomJoinModal;