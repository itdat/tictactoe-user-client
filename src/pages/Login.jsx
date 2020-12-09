import React, { useState, useEffect } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Typography,
  Container,
} from "@material-ui/core";
import io from "socket.io-client";

import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";

let socket;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: "#004c9e",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    background: "#004c9e",
    color: "#fff",
    margin: theme.spacing(3, 0, 2),
    "&:hover": {
      background: "#004c9edd",
    },
  },
}));

export default function Login({ history }) {
  const classes = useStyles();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [username, setUsername] = useState('');
  const ENDPOINT = "https://tictactoe-user-api.herokuapp.com/";

  useEffect(() => {
    socket = io(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });

    // console.log('[ Online List ] Username = ', username);

    let room = "1234";

    if (username !== '') {
      socket.emit('join', { name: username, room }, (error) => {
        if(error) {
          alert(error);
        }
      });
    }

  }, [ENDPOINT, username]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const username = formData.username;
    const password = formData.password;

    const data = {
      username,
      password,
    };
    try {
      const res = await axios.post(
        "https://tictactoe-user-api.herokuapp.com/users/login",
        data,
        config
      );
      if (res.status === 200) {
        setUsername(formData.username);
        // localStorage.setItem("username", username);
        history.push("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label={formData.username === "" ? "Username" : ""}
            value={formData.username}
            onChange={handleInputChange}
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label={formData.password === "" ? "Password" : ""}
            value={formData.password}
            onChange={handleInputChange}
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleLogin}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                style={{ color: "inherit" }}
                to="/forgot-password"
                variant="body2"
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link style={{ color: "inherit" }} to="/sign-up" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
