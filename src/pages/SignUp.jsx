import React, { useState, useContext, useEffect } from "react";
import {
  CssBaseline,
  Avatar,
  Button,
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Container,
} from "@material-ui/core/";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

import AuthContext from "../context/auth/authContext";
import { ThemeContext } from "../App";
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
    marginTop: theme.spacing(3),
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

export default function SignUp({ history }) {
  const classes = useStyles();
  const socket = useContext(ThemeContext);

  // Use auth context
  const authContext = useContext(AuthContext);
  const {
    loginOAuth,
    register,
    error,
    clearErrors,
    isAuthenticated,
  } = authContext;

  // Init form data
  const [formData, setFormData] = useState({
    fullname: "",
    username: "",
    password: "",
  });

  // Get form data
  const { fullname, username, password } = formData;

  // Listen if user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      socket.emit("setOnlineStatus", { name: username }, (error) => {
        if (error) {
          alert(error);
        } else {
          history.push("/");
        }
      });
    }

    if (error) {
      alert(error);
      // setAlert(error);
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, history]);

  // Handle input change
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    register({
      fullname,
      username,
      password,
    });
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
            Sign up
          </Typography>
          <form className={classes.form} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="fullname"
                  name="fullname"
                  autoComplete="fullname"
                  label={formData.fullname === "" ? "Fullname" : ""}
                  value={formData.fullname}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="username"
                  name="username"
                  autoComplete="username"
                  label={formData.username === "" ? "Username" : ""}
                  value={formData.username}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  label={formData.password === "" ? "Password" : ""}
                  value={formData.password}
                  onChange={handleInputChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link style={{ color: "inherit" }} to="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </Container>
    </OnlineListWrapper>
  );
}
