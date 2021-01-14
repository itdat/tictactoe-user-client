import React, { useState, useContext, useEffect } from "react";
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

import { Link } from "react-router-dom";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles } from "@material-ui/core/styles";
import AuthContext from "../context/auth/authContext";
import AlertContext from "../context/alert/alertContext";

import OnlineListWrapper from "../components/OnlineListWrapper";

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

  // Use auth context
  const authContext = useContext(AuthContext);
  const {
    login,
    error,
    isAuthenticated,
    loadUser,
    user,
  } = authContext;

  // Use alert context
  const alertContext = useContext(AlertContext);
  // eslint-disable-next-line no-unused-vars
  const { alerts, setAlert } = alertContext;
  const [message, setMessage] = useState({ open: false, text: "" });

  // Init form data
  const [formData, setFormData] = useState({ username: "", password: "" });

  // Get form data
  const { username, password } = formData;

  useEffect(() => {
    loadUser();

    if (isAuthenticated && user) {
      if (message.text === "") {
        showMessage("You are already logged in, you need to log out before logging in as different account.");
      }
    }
    // eslint-disable-next-line
  }, [isAuthenticated, error]);

  const showMessage = (msg) => {
    setMessage({ open: true, text: msg });

    setTimeout(() => {
      handleClose();
    }, 4000)
  };

  const handleClose = () => {
    setMessage({ open: false, text: "" });
  };

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username === "" || password === "") {
      // setAlert("Please fill in all fields");
      alert("Please fill in all fields");
    } else {
      const res = await login({
        username,
        password,
      });
      if (res.success) {
        showMessage("You have successfully logged in.");
        // showMessage("You have successfully logged in. You will be redirected to homepage.");
        // setTimeout(() => history.push("/"), 4300);
      } else {
        showMessage("Invalid Login Credentials");
      }
    }
  };

  return (
    <OnlineListWrapper>
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
              onClick={handleSubmit}
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
                <Link
                  style={{ color: "inherit" }}
                  to="/sign-up"
                  variant="body2"
                >
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
          <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={message.open}
            onClose={handleClose}
            message={message.text}
            key='login_toast'
          />
        </div>
      </Container>
    </OnlineListWrapper>
  );
}
