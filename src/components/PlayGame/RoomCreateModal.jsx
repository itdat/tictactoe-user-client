import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";

import VideogameAsset from "@material-ui/icons/VideogameAsset";
import Rating from '@material-ui/lab/Rating';
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Typography,
} from "@material-ui/core";

import { ThemeContext } from '../../App';
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

const RoomCreateModal = ({ close, onClick }) => {
  const { user } = useContext(AuthContext);
  const [name] = useState(user?.username ?? '');

  const classes = useStyles();
  const socket = useContext(ThemeContext)

  const [formData, setFormData] = useState({ room: socket.id, level: 3 });

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
          Create Room
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            disabled
            variant="outlined"
            className={classes.inputField}
            required
            fullWidth
            id="room"
            label="CODE"
            value={formData.room}
            onChange={handleInputChange}
            name="room"
            autoComplete="room"
            autoFocus
          />
          <TextField
            variant="outlined"
            className={classes.inputField}
            required
            fullWidth
            id="roomName"
            onChange={handleInputChange}
            label="Name"
            name="roomName"
            autoComplete="roomName"
            autoFocus
          />
          <Grid container xs={3} sm item className={classes.inputField}>
            <Grid item style={{ marginRight: ".75rem" }}>
              <Typography component="legend">Difficulty level </Typography>
            </Grid>
            <Grid item>
              <Rating
                value={formData.level}
                name="level"
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={(e) => {
              e.preventDefault();
              
              const { room, roomName, level} = formData;
              onClick(name, room, roomName, level);
              close();
            }}
          >
            Create
          </Button>
        </form>
      </div>
    </div>
  </div>;
}

export default RoomCreateModal;